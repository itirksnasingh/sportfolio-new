from functools import wraps
from flask import request, jsonify
from firebase_admin import auth

def require_auth(f):
    """
    Middleware decorator to verify Firebase ID token
    Usage: @require_auth
    
    This extracts the token from Authorization header,
    verifies it with Firebase, and attaches firebase_user to request
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            # Get Authorization header
            auth_header = request.headers.get('Authorization')
            print(f"🔐 Auth header received: {'Yes' if auth_header else 'No'}")
            
            if not auth_header:
                return jsonify({
                    'error': 'Access denied',
                    'message': 'No authorization token provided'
                }), 401
            
            # Check if header starts with 'Bearer '
            if not auth_header.startswith('Bearer '):
                return jsonify({
                    'error': 'Invalid token format',
                    'message': 'Authorization header must start with "Bearer "'
                }), 401
            
            # Extract token
            token = auth_header.replace('Bearer ', '')
            print(f"🎫 Token length: {len(token)}")
            
            # Verify token with Firebase
            try:
                firebase_user = auth.verify_id_token(token)
                print(f"✅ Token verified - UID: {firebase_user.get('uid')}, Email: {firebase_user.get('email')}")
                
                # Attach firebase_user to request object
                request.firebase_user = firebase_user
                
                # Call the actual route function
                return f(*args, **kwargs)
                
            except auth.InvalidIdTokenError:
                print("❌ Invalid ID token")
                return jsonify({
                    'error': 'Invalid token',
                    'message': 'The provided token is invalid'
                }), 401
            except auth.ExpiredIdTokenError:
                print("❌ Expired ID token")
                return jsonify({
                    'error': 'Token expired',
                    'message': 'The provided token has expired'
                }), 401
            except Exception as e:
                print(f"❌ Token verification error: {str(e)}")
                return jsonify({
                    'error': 'Authentication failed',
                    'message': str(e)
                }), 401
                
        except Exception as e:
            print(f"❌ Auth middleware error: {str(e)}")
            return jsonify({
                'error': 'Server error',
                'message': 'An error occurred during authentication'
            }), 500
    
    return decorated_function
