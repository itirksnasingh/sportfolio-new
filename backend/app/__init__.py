from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials

# Load environment variables
load_dotenv()

# Global variables for MongoDB and Firebase
mongo_client = None
db = None
firebase_app = None

def create_app():
    """Create and configure Flask application"""
    app = Flask(__name__)
    
    # Enable CORS for all routes (allow frontend to communicate)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    app.config['MONGO_URI'] = os.getenv(
        'MONGO_URI', 
        'mongodb+srv://prathameshkhaire415_db_user:bVpyJQEh6gA0L9tW@clustercheck.rrlk1mi.mongodb.net/authdb?retryWrites=true&w=majority&appName=ClusterCheck'
    )
    
    # Initialize MongoDB
    global mongo_client, db
    try:
        mongo_client = MongoClient(app.config['MONGO_URI'])
        db = mongo_client.get_database()
        print("✅ MongoDB connected successfully")
        
        # Test connection
        mongo_client.admin.command('ping')
        print(f"✅ MongoDB database: {db.name}")
    except Exception as e:
        print(f"❌ MongoDB connection error: {e}")
    
    # Initialize Firebase Admin SDK
    global firebase_app
    try:
        # Get the service account key path
        key_path = os.getenv(
            'FIREBASE_SERVICE_ACCOUNT_KEY_PATH',
            os.path.join(os.path.dirname(__file__), '..', '..', '..', 'API_Integration', 'model', 'login-check-10239-firebase-adminsdk-fbsvc-64b450bbd7.json')
        )
        
        if os.path.exists(key_path):
            cred = credentials.Certificate(key_path)
            firebase_app = firebase_admin.initialize_app(cred)
            print("✅ Firebase Admin SDK initialized successfully")
        else:
            print(f"⚠️ Firebase service account key not found at: {key_path}")
            print("⚠️ Firebase authentication will not work without the key")
    except Exception as e:
        print(f"❌ Firebase initialization error: {e}")
    
    # Register blueprints
    from app.routes.user_routes import user_bp
    from app.routes.health_routes import health_bp
    from app.routes.ai_routes import ai_bp
    
    app.register_blueprint(health_bp)
    app.register_blueprint(user_bp, url_prefix='/api/user')
    app.register_blueprint(ai_bp, url_prefix='/api/ai')
    
    return app

def get_db():
    """Get MongoDB database instance"""
    return db
