import cv2
import mediapipe as mp
import math
import numpy as np
from PIL import Image
import io

class PostureAnalyzer:
    """Posture Analysis Service using MediaPipe"""
    
    def __init__(self):
        """Initialize MediaPipe Pose"""
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose(
            static_image_mode=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        self.mp_draw = mp.solutions.drawing_utils
        print("✅ Posture Analyzer initialized")
    
    @staticmethod
    def calculate_angle(point_a, point_b, point_c):
        """
        Calculate angle between three points
        
        Args:
            point_a, point_b, point_c: Landmark points with x, y attributes
            
        Returns:
            float: Angle in degrees
        """
        a = (point_a.x, point_a.y)
        b = (point_b.x, point_b.y)
        c = (point_c.x, point_c.y)
        
        angle = abs(math.degrees(
            math.atan2(c[1] - b[1], c[0] - b[0]) -
            math.atan2(a[1] - b[1], a[0] - b[0])
        ))
        
        return angle
    
    def analyze_image(self, image_data):
        """
        Analyze posture from image
        
        Args:
            image_data: Image bytes or file-like object
            
        Returns:
            dict: Analysis results
        """
        try:
            # Read image
            if isinstance(image_data, bytes):
                nparr = np.frombuffer(image_data, np.uint8)
                img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            else:
                # File-like object
                image_data.seek(0)
                pil_image = Image.open(image_data)
                img = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
            
            # Convert to RGB for MediaPipe
            rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            result = self.pose.process(rgb)
            
            if not result.pose_landmarks:
                return {
                    "success": False,
                    "error": "No person detected in image",
                    "landmarks_detected": False
                }
            
            lm = result.pose_landmarks.landmark
            
            # Extract key landmarks
            left_hip = lm[23]
            left_knee = lm[25]
            left_ankle = lm[27]
            right_hip = lm[24]
            right_knee = lm[26]
            right_ankle = lm[28]
            left_shoulder = lm[11]
            right_shoulder = lm[12]
            left_elbow = lm[13]
            right_elbow = lm[14]
            nose = lm[0]
            
            # Calculate angles
            left_knee_angle = self.calculate_angle(left_hip, left_knee, left_ankle)
            right_knee_angle = self.calculate_angle(right_hip, right_knee, right_ankle)
            back_angle = self.calculate_angle(left_shoulder, left_hip, left_knee)
            
            # Calculate alignments
            shoulder_diff = abs(left_shoulder.y - right_shoulder.y) * 100
            neck_tilt = abs(nose.x - ((left_shoulder.x + right_shoulder.x) / 2)) * 100
            
            # Analyze results
            issues = []
            recommendations = []
            
            # Knee analysis
            if left_knee_angle < 90 or right_knee_angle < 90:
                issues.append("Excessive knee bending detected")
                recommendations.append("Keep knees slightly bent, not over-flexed")
            
            # Back analysis
            if back_angle < 150:
                issues.append("Back leaning forward")
                recommendations.append("Maintain an upright posture with straight back")
            
            # Shoulder analysis
            if shoulder_diff > 5:
                issues.append("Shoulders not level")
                recommendations.append("Balance your shoulders at the same height")
            
            # Neck analysis
            if neck_tilt > 5:
                issues.append("Head not centered")
                recommendations.append("Center your head over your shoulders")
            
            # Overall score (0-100)
            score = 100
            score -= len(issues) * 15
            score = max(0, score)
            
            analysis = {
                "success": True,
                "landmarks_detected": True,
                "angles": {
                    "left_knee": round(left_knee_angle, 2),
                    "right_knee": round(right_knee_angle, 2),
                    "back": round(back_angle, 2)
                },
                "alignments": {
                    "shoulder_imbalance": round(shoulder_diff, 2),
                    "neck_tilt": round(neck_tilt, 2)
                },
                "issues": issues,
                "recommendations": recommendations,
                "posture_score": score,
                "status": "Good" if score >= 70 else "Needs Improvement" if score >= 50 else "Poor"
            }
            
            return analysis
            
        except Exception as e:
            print(f"❌ Posture analysis error: {e}")
            return {
                "success": False,
                "error": str(e),
                "landmarks_detected": False
            }
    
    def analyze_with_visualization(self, image_data):
        """
        Analyze posture and return image with landmarks drawn
        
        Args:
            image_data: Image bytes or file-like object
            
        Returns:
            tuple: (analysis_dict, annotated_image_bytes)
        """
        try:
            # Read image
            if isinstance(image_data, bytes):
                nparr = np.frombuffer(image_data, np.uint8)
                img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            else:
                image_data.seek(0)
                pil_image = Image.open(image_data)
                img = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
            
            # Convert to RGB for MediaPipe
            rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            result = self.pose.process(rgb)
            
            # Get analysis
            analysis = self.analyze_image(image_data)
            
            if result.pose_landmarks:
                # Draw landmarks on image
                self.mp_draw.draw_landmarks(
                    img, 
                    result.pose_landmarks, 
                    self.mp_pose.POSE_CONNECTIONS
                )
            
            # Convert annotated image to bytes
            _, buffer = cv2.imencode('.jpg', img)
            annotated_image = buffer.tobytes()
            
            return analysis, annotated_image
            
        except Exception as e:
            print(f"❌ Visualization error: {e}")
            return {
                "success": False,
                "error": str(e)
            }, None
    
    def __del__(self):
        """Cleanup"""
        if hasattr(self, 'pose'):
            self.pose.close()
