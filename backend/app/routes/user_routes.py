from flask import Blueprint, request, jsonify
from app.middleware.auth_middleware import require_auth
from app.models.user_model import UserModel
from app import get_db

user_bp = Blueprint('user', __name__)

@user_bp.route('/me', methods=['GET'])
@require_auth
def get_current_user():
    """
    Get current authenticated user's data
    Requires: Authorization header with Firebase ID token
    """
    try:
        print("✅ /api/user/me endpoint hit")
        
        # Get Firebase user from request (attached by auth middleware)
        firebase_user = request.firebase_user
        uid = firebase_user.get('uid')
        email = firebase_user.get('email')
        
        print(f"🔥 Firebase user - UID: {uid}, Email: {email}")
        
        # Get MongoDB instance
        db = get_db()
        user_model = UserModel(db)
        
        # Find or create user in MongoDB
        user = user_model.find_or_create(uid, email)
        
        # Serialize and return user data
        user_data = user_model.serialize_user(user)
        
        return jsonify({
            'success': True,
            'user': user_data
        }), 200
        
    except Exception as e:
        print(f"❌ Error in /api/user/me: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch user data',
            'message': str(e)
        }), 500

@user_bp.route('/profile', methods=['GET'])
@require_auth
def get_user_profile():
    """Get user profile"""
    try:
        firebase_user = request.firebase_user
        uid = firebase_user.get('uid')
        
        db = get_db()
        user_model = UserModel(db)
        user = user_model.find_by_firebase_uid(uid)
        
        if not user:
            return jsonify({
                'success': False,
                'error': 'User not found'
            }), 404
        
        user_data = user_model.serialize_user(user)
        return jsonify({
            'success': True,
            'profile': user_data
        }), 200
        
    except Exception as e:
        print(f"❌ Error in /api/user/profile: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@user_bp.route('/profile', methods=['PUT'])
@require_auth
def update_user_profile():
    """Update user profile"""
    try:
        firebase_user = request.firebase_user
        uid = firebase_user.get('uid')
        
        # Get update data from request
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': 'No data provided'
            }), 400
        
        db = get_db()
        user_model = UserModel(db)
        
        # Update profile
        success = user_model.update_profile(uid, data.get('profile', {}))
        
        if success:
            user = user_model.find_by_firebase_uid(uid)
            user_data = user_model.serialize_user(user)
            return jsonify({
                'success': True,
                'message': 'Profile updated successfully',
                'user': user_data
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'Failed to update profile'
            }), 500
            
    except Exception as e:
        print(f"❌ Error in /api/user/profile PUT: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@user_bp.route('/role', methods=['PUT'])
@require_auth
def update_user_role():
    """Update user role (athlete, coach, org)"""
    try:
        firebase_user = request.firebase_user
        uid = firebase_user.get('uid')
        
        data = request.get_json()
        role = data.get('role')
        
        if not role or role not in ['athlete', 'coach', 'org']:
            return jsonify({
                'success': False,
                'error': 'Invalid role. Must be "athlete", "coach", or "org"'
            }), 400
        
        db = get_db()
        user_model = UserModel(db)
        
        success = user_model.update_role(uid, role)
        
        if success:
            user = user_model.find_by_firebase_uid(uid)
            user_data = user_model.serialize_user(user)
            return jsonify({
                'success': True,
                'message': f'Role updated to {role}',
                'user': user_data
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'Failed to update role'
            }), 500
            
    except Exception as e:
        print(f"❌ Error in /api/user/role PUT: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@user_bp.route('/register', methods=['POST'])
@require_auth
def register_user():
    """
    Register/sync user with additional data
    This is called after Firebase auth to store user in MongoDB
    """
    try:
        firebase_user = request.firebase_user
        uid = firebase_user.get('uid')
        email = firebase_user.get('email')
        
        # Get additional data from request
        data = request.get_json() or {}
        
        db = get_db()
        user_model = UserModel(db)
        
        # Create or update user with additional data
        user = user_model.find_or_create(uid, email, data)
        
        user_data = user_model.serialize_user(user)
        
        return jsonify({
            'success': True,
            'message': 'User registered successfully',
            'user': user_data
        }), 201
        
    except Exception as e:
        print(f"❌ Error in /api/user/register: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
