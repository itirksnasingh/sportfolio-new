# Sportfolio Backend - Flask API

Python Flask backend with Firebase Authentication, MongoDB integration, and AI Services.

## Features

✅ **Firebase Authentication** - Token verification and user management  
✅ **MongoDB Database** - User data and AI interaction storage  
✅ **AI Services** - Speech-to-Text, Text-to-Speech, Posture Analysis  
✅ **RESTful API** - Well-structured endpoints with proper error handling  
✅ **CORS Enabled** - Frontend-ready communication

## Setup

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

**Note**: AI dependencies include Vosk (STT), gTTS (TTS), MediaPipe (Posture Analysis)

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB URI and Firebase credentials path.

### 3. Run the Server

```bash
python server.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /health` - Check if server is running
- `GET /api/health` - Check if API is operational

### User Endpoints (Protected)
All user endpoints require Firebase ID token in Authorization header:
```
Authorization: Bearer <firebase_id_token>
```

- `GET /api/user/me` - Get current user data (auto-creates user in MongoDB)
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/role` - Update user role (athlete/coach/org)
- `POST /api/user/register` - Register user with additional data

### AI Endpoints (Protected)

#### Speech-to-Text
- `POST /api/ai/stt/transcribe` - Transcribe audio file to text
  - Body: `file` (audio file), `language` (en/hi/mr)
- `GET /api/ai/stt/languages` - Get supported STT languages

#### Text-to-Speech
- `POST /api/ai/tts/synthesize` - Convert text to speech
  - Body: `{"text": "...", "language": "en", "slow": false}`
- `GET /api/ai/tts/languages` - Get supported TTS languages

#### Posture Analysis
- `POST /api/ai/posture/analyze` - Analyze posture from image
  - Body: `file` (image), `include_visualization` (true/false)
  - Returns: Analysis results with scores, issues, recommendations

#### AI History & Stats
- `GET /api/ai/history` - Get user's AI interaction history
  - Query params: `interaction_type`, `limit`
- `GET /api/ai/stats` - Get user's AI usage statistics

## Architecture

- **Flask**: Web framework
- **Firebase Admin SDK**: Token verification
- **MongoDB**: User data storage
- **CORS**: Enabled for frontend communication

## Directory Structure

```
backend/
├── app/
│   ├── __init__.py          # App factory and initialization
│   ├── models/
│   │   ├── __init__.py
│   │   └── user_model.py    # User MongoDB model
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── health_routes.py # Health check endpoints
│   │   └── user_routes.py   # User API endpoints
│   ├── middleware/
│   │   ├── __init__.py
│   │   └── auth_middleware.py # Firebase token verification
│   └── utils/
│       └── __init__.py      # Utility functions
├── server.py                # Entry point
├── requirements.txt         # Python dependencies
├── .env.example            # Environment variables template
└── README.md               # This file
```

## Next Steps

Phase 2: Add AI API integration endpoints
Phase 3: Connect frontend React app with this backend
