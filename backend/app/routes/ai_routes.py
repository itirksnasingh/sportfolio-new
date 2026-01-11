from flask import Blueprint, request, jsonify, send_file
from werkzeug.utils import secure_filename
from app.middleware.auth_middleware import require_auth
from app.utils.stt_service import STTService
from app.utils.tts_service import TTSService
from app.utils.posture_analysis import PostureAnalyzer
from app.models.ai_interaction_model import AIInteractionModel
from app import get_db
import io
import os

ai_bp = Blueprint('ai', __name__)

# Allowed file extensions
ALLOWED_AUDIO_EXTENSIONS = {'wav', 'mp3', 'ogg', 'flac', 'm4a'}
ALLOWED_IMAGE_EXTENSIONS = {'jpg', 'jpeg', 'png', 'bmp'}

def allowed_file(filename, allowed_extensions):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

# ==================== Speech-to-Text Endpoints ====================

@ai_bp.route('/stt/transcribe', methods=['POST'])
@require_auth
def transcribe_audio():
    """
    Transcribe audio file to text
    
    Request:
        - file: Audio file (WAV, MP3, etc.)
        - language: Language code (optional, default: 'en')
    
    Response:
        - transcription: Transcribed text
        - language: Language used
    """
    try:
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No audio file provided'
            }), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({
                'success': False,
                'error': 'No file selected'
            }), 400
        
        if not allowed_file(file.filename, ALLOWED_AUDIO_EXTENSIONS):
            return jsonify({
                'success': False,
                'error': f'Invalid file type. Allowed: {", ".join(ALLOWED_AUDIO_EXTENSIONS)}'
            }), 400
        
        # Get language from request
        language = request.form.get('language', 'en')
        
        # Initialize STT service
        try:
            stt_service = STTService(language=language)
        except ValueError as e:
            return jsonify({
                'success': False,
                'error': str(e)
            }), 400
        
        # Read audio data
        audio_data = file.read()
        
        # Transcribe
        transcription = stt_service.transcribe_audio_file(audio_data)
        
        # Save interaction to database
        db = get_db()
        ai_model = AIInteractionModel(db)
        firebase_user = request.firebase_user
        
        ai_model.create_interaction(
            user_firebase_uid=firebase_user.get('uid'),
            interaction_type='stt',
            input_data={'filename': secure_filename(file.filename), 'language': language},
            output_data={'transcription': transcription}
        )
        
        return jsonify({
            'success': True,
            'transcription': transcription,
            'language': language,
            'filename': file.filename
        }), 200
        
    except Exception as e:
        print(f"❌ STT error: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@ai_bp.route('/stt/languages', methods=['GET'])
def get_stt_languages():
    """Get supported STT languages"""
    return jsonify({
        'success': True,
        'languages': STTService.get_supported_languages()
    }), 200

# ==================== Text-to-Speech Endpoints ====================

@ai_bp.route('/tts/synthesize', methods=['POST'])
@require_auth
def synthesize_speech():
    """
    Convert text to speech
    
    Request:
        - text: Text to convert
        - language: Language code (optional, default: 'en')
        - slow: Slow speech (optional, default: false)
    
    Response:
        - Audio file (MP3)
    """
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({
                'success': False,
                'error': 'No text provided'
            }), 400
        
        text = data.get('text')
        language = data.get('language', 'en')
        slow = data.get('slow', False)
        
        # Initialize TTS service
        try:
            tts_service = TTSService(language=language)
        except ValueError as e:
            return jsonify({
                'success': False,
                'error': str(e)
            }), 400
        
        # Generate speech
        audio_fp = tts_service.text_to_speech(text, slow=slow)
        
        # Save interaction to database
        db = get_db()
        ai_model = AIInteractionModel(db)
        firebase_user = request.firebase_user
        
        ai_model.create_interaction(
            user_firebase_uid=firebase_user.get('uid'),
            interaction_type='tts',
            input_data={'text': text[:100], 'language': language, 'slow': slow},
            output_data={'audio_generated': True}
        )
        
        # Send audio file
        return send_file(
            audio_fp,
            mimetype='audio/mp3',
            as_attachment=True,
            download_name='speech.mp3'
        )
        
    except Exception as e:
        print(f"❌ TTS error: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@ai_bp.route('/tts/languages', methods=['GET'])
def get_tts_languages():
    """Get supported TTS languages"""
    return jsonify({
        'success': True,
        'languages': TTSService.get_supported_languages()
    }), 200

# ==================== Posture Analysis Endpoints ====================

@ai_bp.route('/posture/analyze', methods=['POST'])
@require_auth
def analyze_posture():
    """
    Analyze posture from image
    
    Request:
        - file: Image file (JPG, PNG, etc.)
        - include_visualization: Include annotated image (optional, default: false)
    
    Response:
        - analysis: Posture analysis results
        - annotated_image: Base64 encoded image with landmarks (if requested)
    """
    try:
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No image file provided'
            }), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({
                'success': False,
                'error': 'No file selected'
            }), 400
        
        if not allowed_file(file.filename, ALLOWED_IMAGE_EXTENSIONS):
            return jsonify({
                'success': False,
                'error': f'Invalid file type. Allowed: {", ".join(ALLOWED_IMAGE_EXTENSIONS)}'
            }), 400
        
        # Get options
        include_visualization = request.form.get('include_visualization', 'false').lower() == 'true'
        
        # Read image data
        image_data = file.read()
        
        # Initialize posture analyzer
        analyzer = PostureAnalyzer()
        
        if include_visualization:
            analysis, annotated_image = analyzer.analyze_with_visualization(image_data)
            
            # Convert annotated image to base64
            import base64
            if annotated_image:
                annotated_image_b64 = base64.b64encode(annotated_image).decode('utf-8')
            else:
                annotated_image_b64 = None
        else:
            analysis = analyzer.analyze_image(image_data)
            annotated_image_b64 = None
        
        # Save interaction to database
        if analysis.get('success'):
            db = get_db()
            ai_model = AIInteractionModel(db)
            firebase_user = request.firebase_user
            
            ai_model.create_interaction(
                user_firebase_uid=firebase_user.get('uid'),
                interaction_type='posture_analysis',
                input_data={'filename': secure_filename(file.filename)},
                output_data={
                    'posture_score': analysis.get('posture_score'),
                    'status': analysis.get('status'),
                    'issues_count': len(analysis.get('issues', []))
                }
            )
        
        response = {
            'success': analysis.get('success', False),
            'analysis': analysis
        }
        
        if annotated_image_b64:
            response['annotated_image'] = annotated_image_b64
        
        return jsonify(response), 200
        
    except Exception as e:
        print(f"❌ Posture analysis error: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ==================== AI Interaction History ====================

@ai_bp.route('/history', methods=['GET'])
@require_auth
def get_ai_history():
    """
    Get user's AI interaction history
    
    Query params:
        - interaction_type: Filter by type (optional)
        - limit: Number of results (optional, default: 20)
    """
    try:
        firebase_user = request.firebase_user
        uid = firebase_user.get('uid')
        
        # Get query params
        interaction_type = request.args.get('interaction_type')
        limit = int(request.args.get('limit', 20))
        
        db = get_db()
        ai_model = AIInteractionModel(db)
        
        if interaction_type:
            interactions = ai_model.get_user_interactions_by_type(uid, interaction_type, limit)
        else:
            interactions = ai_model.get_user_interactions(uid, limit)
        
        # Serialize interactions
        serialized = [ai_model.serialize_interaction(i) for i in interactions]
        
        return jsonify({
            'success': True,
            'count': len(serialized),
            'interactions': serialized
        }), 200
        
    except Exception as e:
        print(f"❌ History error: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@ai_bp.route('/stats', methods=['GET'])
@require_auth
def get_ai_stats():
    """Get user's AI usage statistics"""
    try:
        firebase_user = request.firebase_user
        uid = firebase_user.get('uid')
        
        db = get_db()
        ai_model = AIInteractionModel(db)
        
        stats = ai_model.get_user_stats(uid)
        
        return jsonify({
            'success': True,
            'stats': stats
        }), 200
        
    except Exception as e:
        print(f"❌ Stats error: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
