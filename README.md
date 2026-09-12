# AI Learning Platform

An adaptive AI learning platform that transforms how professionals acquire and apply AI skills, making advanced AI education accessible, personalized, and directly applicable to real-world challenges.

## Product Vision

To become the leading adaptive AI learning platform that transforms how professionals acquire and apply AI skills, making advanced AI education accessible, personalized, and directly applicable to real-world challenges.

## Target Audience

- Working professionals aged 25-45 seeking to transition into AI roles
- Current tech professionals upskilling in AI
- Technical managers needing AI literacy for strategic decision-making

## Core Features

- **Course Management**: Create, read, update, and delete AI courses
- **Module Organization**: Structure courses with organized learning modules
- **User Management**: Handle learner, instructor, and admin roles
- **Adaptive Learning**: Foundation for personalized learning paths

## Technology Stack

- **Backend Framework**: FastAPI (Python)
- **Database**: SQLite (development) / PostgreSQL (production ready)
- **ORM**: SQLAlchemy
- **Validation**: Pydantic
- **Architecture**: Modular Monolith

## Prerequisites

- Python 3.9 or higher
- pip (Python package manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-learning-platform
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r backend/requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env file with your configuration
```

## Running Locally

1. Activate your virtual environment (if not already activated):
```bash
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Start the development server:
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

3. Access the application:
- API: http://localhost:8000
- Interactive API Documentation: http://localhost:8000/docs
- Alternative API Documentation: http://localhost:8000/redoc

## API Endpoints

### Health Check
- `GET /` - Root health check
- `GET /health` - Detailed health check

### Courses
- `POST /api/v1/courses` - Create a new course
- `GET /api/v1/courses` - List all courses (with pagination)
- `GET /api/v1/courses/{course_id}` - Get a specific course
- `PUT /api/v1/courses/{course_id}` - Update a course
- `DELETE /api/v1/courses/{course_id}` - Delete a course

### Modules
- `POST /api/v1/courses/{course_id}/modules` - Create a module for a course
- `GET /api/v1/courses/{course_id}/modules` - Get all modules for a course

## Database Schema

### Course
- `id`: Primary key
- `title`: Course title
- `description`: Course description
- `difficulty_level`: beginner, intermediate, or advanced
- `duration_hours`: Estimated completion time
- `is_active`: Active status
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Module
- `id`: Primary key
- `course_id`: Foreign key to Course
- `title`: Module title
- `description`: Module description
- `order`: Display order
- `content`: Module content
- `is_active`: Active status
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### User
- `id`: Primary key
- `email`: User email (unique)
- `full_name`: User's full name
- `hashed_password`: Encrypted password
- `role`: learner, instructor, or admin
- `is_active`: Active status
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

## Environment Variables

See `.env.example` for all available configuration options:

- `APP_NAME`: Application name
- `APP_VERSION`: Application version
- `DEBUG`: Debug mode (True/False)
- `DATABASE_URL`: Database connection string
- `SECRET_KEY`: Secret key for JWT tokens (change in production!)
- `ALGORITHM`: JWT algorithm (HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time
- `ALLOWED_ORIGINS`: CORS allowed origins

## Development

### Project Structure
```
.
├── backend/
│   ├── main.py              # Application entry point
│   ├── config.py            # Configuration management
│   ├── database.py          # Database setup
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── requirements.txt     # Python dependencies
│   └── routers/
│       ├── __init__.py
│       └── courses.py       # Course endpoints
├── .env.example             # Environment variables template
└── README.md                # This file
```

### Adding New Features

1. Define models in `backend/models.py`
2. Create Pydantic schemas in `backend/schemas.py`
3. Implement routes in `backend/routers/`
4. Register routers in `backend/main.py`

## Security Best Practices

- Never commit `.env` file with real credentials
- Change `SECRET_KEY` in production
- Use strong passwords
- Enable HTTPS in production
- Implement rate limiting for production
- Regular security audits

## Production Deployment

For production deployment:

1. Use PostgreSQL instead of SQLite:
```bash
DATABASE_URL=postgresql://user:password@localhost/dbname
```

2. Set strong SECRET_KEY:
```bash
SECRET_KEY=$(openssl rand -hex 32)
```

3. Disable DEBUG mode:
```bash
DEBUG=False
```

4. Use a production ASGI server:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

5. Set up reverse proxy (nginx/Apache)
6. Enable HTTPS with SSL certificates
7. Implement proper logging and monitoring

## License

[Your License Here]

## Support

For support, please contact [your-email@example.com]
