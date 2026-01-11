from flask import Blueprint, jsonify

health_bp = Blueprint('health', __name__)

@health_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Flask backend is running',
        'service': 'Sportfolio Backend'
    }), 200

@health_bp.route('/api/health', methods=['GET'])
def api_health_check():
    """API health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'API is operational',
        'version': '1.0.0'
    }), 200
