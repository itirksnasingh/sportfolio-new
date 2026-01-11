from datetime import datetime
from bson import ObjectId

class UserModel:
    """User model for MongoDB operations"""
    
    def __init__(self, db):
        """Initialize with MongoDB database"""
        self.collection = db.users
        # Create index on firebase_uid for faster queries
        self.collection.create_index("firebase_uid", unique=True)
    
    def find_by_firebase_uid(self, firebase_uid):
        """Find user by Firebase UID"""
        return self.collection.find_one({'firebase_uid': firebase_uid})
    
    def find_by_id(self, user_id):
        """Find user by MongoDB ObjectId"""
        if isinstance(user_id, str):
            user_id = ObjectId(user_id)
        return self.collection.find_one({'_id': user_id})
    
    def find_by_email(self, email):
        """Find user by email"""
        return self.collection.find_one({'email': email})
    
    def create_user(self, firebase_uid, email, additional_data=None):
        """Create a new user in MongoDB"""
        user_data = {
            'firebase_uid': firebase_uid,
            'email': email,
            'role': additional_data.get('role') if additional_data else None,
            'profile': additional_data.get('profile', {}) if additional_data else {},
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        result = self.collection.insert_one(user_data)
        user_data['_id'] = result.inserted_id
        return user_data
    
    def find_or_create(self, firebase_uid, email, additional_data=None):
        """Find existing user or create new one"""
        user = self.find_by_firebase_uid(firebase_uid)
        
        if user:
            print(f"ℹ️ User already exists in MongoDB: {email}")
            return user
        
        print(f"🆕 Creating new user in MongoDB: {email}")
        return self.create_user(firebase_uid, email, additional_data)
    
    def update_user(self, firebase_uid, update_data):
        """Update user data"""
        update_data['updated_at'] = datetime.utcnow()
        result = self.collection.update_one(
            {'firebase_uid': firebase_uid},
            {'$set': update_data}
        )
        return result.modified_count > 0
    
    def update_profile(self, firebase_uid, profile_data):
        """Update user profile"""
        return self.update_user(firebase_uid, {'profile': profile_data})
    
    def update_role(self, firebase_uid, role):
        """Update user role (athlete, coach, org)"""
        return self.update_user(firebase_uid, {'role': role})
    
    def delete_user(self, firebase_uid):
        """Delete user from MongoDB"""
        result = self.collection.delete_one({'firebase_uid': firebase_uid})
        return result.deleted_count > 0
    
    def serialize_user(self, user):
        """Convert MongoDB user document to JSON-serializable dict"""
        if not user:
            return None
        
        user['_id'] = str(user['_id'])
        if 'created_at' in user:
            user['created_at'] = user['created_at'].isoformat()
        if 'updated_at' in user:
            user['updated_at'] = user['updated_at'].isoformat()
        
        return user
