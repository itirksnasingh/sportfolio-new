import os
from app import create_app

# Create Flask app
app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV', 'development') == 'development'
    
    print(f"\n🚀 Starting Flask server on port {port}")
    print(f"📍 Server URL: http://localhost:{port}")
    print(f"🏥 Health check: http://localhost:{port}/health")
    print(f"👤 User API: http://localhost:{port}/api/user/me")
    print(f"🐛 Debug mode: {debug}\n")
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug
    )
