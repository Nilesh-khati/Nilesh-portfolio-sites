# Backend API Documentation

## Overview

Portfolio website में complete backend API already implemented है। सभी routes Next.js API Routes के through काम करते हैं।

## Base URL

- **Development:** `http://localhost:3000`
- **Production:** Your deployed URL

## API Endpoints

### 1. Projects API

#### Get All Projects
```http
GET /api/projects
```

**Response:**
```json
[
  {
    "_id": "objectId",
    "id": "project-123",
    "title": "Project Name",
    "description": "Short description",
    "longDescription": "Long description",
    "technologies": ["React", "Node.js"],
    "image": "/image.jpg",
    "github": "https://github.com/...",
    "demo": "https://demo.com",
    "featured": true,
    "order": 0,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Create Project
```http
POST /api/projects
Content-Type: application/json

{
  "title": "Project Name",
  "description": "Short description",
  "longDescription": "Long description (optional)",
  "technologies": ["React", "Node.js"],
  "image": "/image.jpg (optional)",
  "github": "https://github.com/... (optional)",
  "demo": "https://demo.com (optional)",
  "featured": false (optional),
  "order": 0 (optional)
}
```

#### Get Project by ID
```http
GET /api/projects/[id]
```

#### Update Project
```http
PUT /api/projects/[id]
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  ...
}
```

#### Delete Project
```http
DELETE /api/projects/[id]
```

### 2. Contact API

#### Submit Contact Message
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "message": "Message sent successfully"
}
```

#### Get All Messages (Admin)
```http
GET /api/contact
```

**Response:**
```json
[
  {
    "_id": "objectId",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Message text",
    "read": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Message by ID
```http
GET /api/contact/[id]
```

#### Update Message (Mark as Read)
```http
PUT /api/contact/[id]
Content-Type: application/json

{
  "read": true
}
```

### 3. Authentication API

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

## Database Schema

### Projects Collection
```javascript
{
  _id: ObjectId,
  id: String,              // Unique identifier
  title: String,            // Required
  description: String,      // Required
  longDescription: String, // Optional
  technologies: [String],   // Required
  image: String,           // Optional
  github: String,          // Optional
  demo: String,            // Optional
  featured: Boolean,       // Default: false
  order: Number,            // Default: 0
  createdAt: Date,
  updatedAt: Date
}
```

### Contacts Collection
```javascript
{
  _id: ObjectId,
  name: String,            // Required
  email: String,            // Required (validated)
  message: String,          // Required
  read: Boolean,            // Default: false
  createdAt: Date
}
```

## Error Handling

All API routes return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (missing/invalid data)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error
- `503` - Service Unavailable (MongoDB not configured)

## MongoDB Connection

- **Database Name:** `portfolio` (configurable via `DB_NAME` env var)
- **Connection:** Handled automatically via `lib/mongodb.ts`
- **Fallback:** APIs work without MongoDB (return empty arrays/errors gracefully)

## Testing

### Test MongoDB Connection
```bash
npm run test:mongodb
```

### Test API Endpoints

**Using curl:**
```bash
# Get projects
curl http://localhost:3000/api/projects

# Create project
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test desc","technologies":["React"]}'

# Submit contact
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","message":"Hello"}'
```

**Using Postman/Thunder Client:**
- Import the endpoints above
- Set Content-Type: application/json
- Add request body for POST/PUT requests

## Security Notes

1. **Admin Authentication:**
   - Simple username/password auth
   - Credentials stored in `.env.local`
   - Change default password in production!

2. **Input Validation:**
   - Email validation for contact form
   - Required fields checked
   - MongoDB injection protection (via MongoDB driver)

3. **CORS:**
   - Same-origin requests only (Next.js default)
   - No CORS issues for same-domain requests

## Next Steps

1. ✅ MongoDB setup करें (see `MONGODB_SETUP.md`)
2. ✅ `.env.local` file create करें
3. ✅ API endpoints test करें
4. ✅ Admin dashboard से projects manage करें
5. ✅ Contact form test करें

## Files Structure

```
app/api/
├── auth/
│   └── login/
│       └── route.ts          # Authentication
├── contact/
│   ├── [id]/
│   │   └── route.ts          # Get/Update contact by ID
│   └── route.ts              # Create/Get all contacts
└── projects/
    ├── [id]/
    │   └── route.ts          # Get/Update/Delete project by ID
    └── route.ts              # Create/Get all projects

lib/
└── mongodb.ts                # Database connection utility
```

All backend code is ready and working! 🚀


