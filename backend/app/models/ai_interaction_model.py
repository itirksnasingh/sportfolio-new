from datetime import datetime
from bson import ObjectId

class AIInteractionModel:
    """Model for storing AI interactions"""
    
    def __init__(self, db):
        """Initialize with MongoDB database"""
        self.collection = db.ai_interactions
        # Create indexes for better query performance
        self.collection.create_index("user_firebase_uid")
        self.collection.create_index([("user_firebase_uid", 1), ("interaction_type", 1)])
        self.collection.create_index([("created_at", -1)])
    
    def create_interaction(self, user_firebase_uid, interaction_type, input_data, output_data):
        """
        Create a new AI interaction record
        
        Args:
            user_firebase_uid (str): User's Firebase UID
            interaction_type (str): Type of interaction (stt, tts, posture_analysis, etc.)
            input_data (dict): Input data for the interaction
            output_data (dict): Output/result data
            
        Returns:
            dict: Created interaction document
        """
        interaction_data = {
            'user_firebase_uid': user_firebase_uid,
            'interaction_type': interaction_type,
            'input_data': input_data,
            'output_data': output_data,
            'created_at': datetime.utcnow()
        }
        
        result = self.collection.insert_one(interaction_data)
        interaction_data['_id'] = result.inserted_id
        
        print(f"✅ AI interaction saved: {interaction_type} for user {user_firebase_uid}")
        return interaction_data
    
    def get_user_interactions(self, user_firebase_uid, limit=20):
        """Get all interactions for a user"""
        return list(
            self.collection.find({'user_firebase_uid': user_firebase_uid})
            .sort('created_at', -1)
            .limit(limit)
        )
    
    def get_user_interactions_by_type(self, user_firebase_uid, interaction_type, limit=20):
        """Get interactions for a user filtered by type"""
        return list(
            self.collection.find({
                'user_firebase_uid': user_firebase_uid,
                'interaction_type': interaction_type
            })
            .sort('created_at', -1)
            .limit(limit)
        )
    
    def get_interaction_by_id(self, interaction_id):
        """Get interaction by ID"""
        if isinstance(interaction_id, str):
            interaction_id = ObjectId(interaction_id)
        return self.collection.find_one({'_id': interaction_id})
    
    def delete_interaction(self, interaction_id):
        """Delete an interaction"""
        if isinstance(interaction_id, str):
            interaction_id = ObjectId(interaction_id)
        result = self.collection.delete_one({'_id': interaction_id})
        return result.deleted_count > 0
    
    def get_user_stats(self, user_firebase_uid):
        """
        Get statistics for user's AI usage
        
        Returns:
            dict: Statistics including counts by type
        """
        pipeline = [
            {'$match': {'user_firebase_uid': user_firebase_uid}},
            {'$group': {
                '_id': '$interaction_type',
                'count': {'$sum': 1}
            }}
        ]
        
        results = list(self.collection.aggregate(pipeline))
        
        stats = {
            'total_interactions': 0,
            'by_type': {}
        }
        
        for result in results:
            interaction_type = result['_id']
            count = result['count']
            stats['by_type'][interaction_type] = count
            stats['total_interactions'] += count
        
        return stats
    
    def serialize_interaction(self, interaction):
        """Convert MongoDB interaction document to JSON-serializable dict"""
        if not interaction:
            return None
        
        interaction['_id'] = str(interaction['_id'])
        if 'created_at' in interaction:
            interaction['created_at'] = interaction['created_at'].isoformat()
        
        return interaction
