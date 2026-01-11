# Flask Backend Setup Guide - Phase 1 Complete ✅

## What We've Built

A complete Flask backend for the Sportfolio application with:
- ✅ **Firebase Authentication** integration (token verification)
- ✅ **MongoDB** database connection (user data storage)
- ✅ **RESTful API** endpoints
- ✅ **CORS** enabled for frontend communication
- ✅ **Authentication middleware** for protected routes

## Quick Start

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Run the Server
```bash
python server.py
```

Server will start on: **http://localhost:5000**

## API Endpoints Available

### Public Endpoints (No Auth Required)
- `GET /health` - Server health check
- `GET /api/health` - API health check

### Protected Endpoints (Require Firebase Token)
All protected endpoints need this header:
```
Authorization: Bearer <firebase_id_token>
```

#### User Endpoints
- `GET /api/user/me` - Get current user (auto-creates in MongoDB)
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/role` - Update user role (athlete/coach/org)
- `POST /api/user/register` - Register user with additional data

## Testing the API

### Test Health Endpoint (No Auth)
```bash
# PowerShell
Invoke-WebRequest -Uri http://localhost:5000/health -UseBasicParsing

# Expected Response:
{
  "status": "healthy",
  "message": "Flask backend is running",
  "service": "Sportfolio Backend"
}
```

### Test Protected Endpoint (With Firebase Token)
```bash
# You'll need a Firebase ID token from your frontend
curl -X GET http://localhost:5000/api/user/me \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN"
```

## Backend Structure

```
backend/
├── app/
│   ├── __init__.py              # App factory, MongoDB & Firebase init
│   ├── models/
│   │   └── user_model.py        # User CRUD operations
│   ├── routes/
│   │   ├── health_routes.py     # Health check endpoints
│   │   └── user_routes.py       # User API endpoints
│   ├── middleware/
│   │   └── auth_middleware.py   # Firebase token verification
│   └── utils/
│       └── __init__.py          # Utility functions
├── server.py                    # Entry point
├── requirements.txt             # Dependencies
├── .env.example                 # Environment template
└── .gitignore                   # Git ignore rules
```

## How It Works

### 1. Firebase Authentication Flow
```
Frontend Login → Get Firebase ID Token → Send to Backend
                                              ↓
Backend Middleware → Verify Token with Firebase → Attach User to Request
                                                         ↓
Route Handler → Access User Data → Return Response
```

### 2. MongoDB Integration
- User data is stored in MongoDB with `firebase_uid` as unique identifier
- When a user calls `/api/user/me`, the backend:
  1. Verifies their Firebase token
  2. Finds or creates their MongoDB user record
  3. Returns the user data

### 3. User Schema in MongoDB
```json
{
  "_id": "ObjectId",
  "firebase_uid": "string (unique)",
  "email": "string",
  "role": "athlete|coach|org",
  "profile": {
    // Custom profile data
  },
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

## Configuration

### Environment Variables (.env)
Create a `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
FIREBASE_SERVICE_ACCOUNT_KEY_PATH=path_to_service_account_key.json
PORT=5000
FLASK_ENV=development
```

Currently using the default MongoDB URI from firebase_check project.

## Next Steps - Phase 2

Now that Phase 1 is complete, you can proceed with:

### Phase 2: AI API Integration
- Add AI service endpoints (STT, TTS, NLP, etc.)
- Integrate with existing AI models in `API_Integration/`
- Create routes for AI features

### Phase 3: Frontend Integration
- Install Firebase SDK in React frontend
- Create authentication context/hooks
- Connect frontend to Flask backend
- Update API calls to use Flask endpoints

## Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB URI in `.env` or app/__init__.py
- Check network connectivity
- Ensure IP is whitelisted in MongoDB Atlas

### Firebase Issues
- Verify service account key path
- Check Firebase project settings
- Ensure Firebase Admin SDK is initialized

### Port Already in Use
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <process_id> /F
```

## Development Notes

- Server runs in debug mode by default
- Auto-reloads on code changes
- Uses Flask development server (not for production)
- CORS enabled for all origins (adjust for production)

---

**Status**: ✅ Phase 1 Complete - Flask Backend with Firebase Auth & MongoDB
**Next**: Phase 2 - AI API Integration
