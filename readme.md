# StackIt - Q&A Platform

A Stack Overflow-like Q&A platform built with FastAPI (backend) and Next.js (frontend).

## 🚀 Features

- **User Authentication**: Register, login, and user management
- **Questions & Answers**: Ask questions, provide answers, and vote on content
- **Voting System**: Upvote and downvote questions and answers
- **Tags**: Categorize questions with tags
- **Search**: Search through questions and answers
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Live notifications and updates

## 🏗️ Architecture

### Backend (FastAPI)
- **Framework**: FastAPI
- **Database**: SQLite (can be easily switched to PostgreSQL/MySQL)
- **ORM**: SQLAlchemy
- **Authentication**: JWT tokens with bcrypt password hashing
- **API Documentation**: Automatic OpenAPI/Swagger documentation

### Frontend (Next.js)
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React hooks
- **Form Handling**: React Hook Form

## 📁 Project Structure

```
stackit/
├── backend/                 # FastAPI Backend
│   └── app/
│       ├── api/            # API endpoints
│       ├── models/         # Database models
│       ├── schemas/        # Pydantic schemas
│       ├── main.py         # FastAPI app entry point
│       ├── config.py       # Configuration
│       └── database.py     # Database setup
├── frontend/               # Next.js Frontend
│   ├── components/         # React components
│   ├── pages/             # Next.js pages
│   ├── styles/            # CSS files
│   ├── utils/             # Utility functions
│   └── public/            # Static assets
├── package.json           # Frontend dependencies
├── requirements.txt       # Backend dependencies
└── README.md             # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r ../requirements.txt
   ```

4. **Run the backend server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

The API will be available at `http://localhost:8000`
API documentation: `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to project root**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## 🗄️ Database

The application uses SQLite by default. The database file will be created automatically when you first run the backend.

To use a different database:

1. Update the `DATABASE_URL` in `backend/app/config.py`
2. Install the appropriate database driver
3. Run database migrations (if needed)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL=sqlite:///./stackit.db
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend Environment

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## 📚 API Endpoints

### Authentication
- `POST /api/v1/users/` - Register new user
- `POST /api/v1/users/login` - User login

### Questions
- `GET /api/v1/questions/` - Get all questions
- `POST /api/v1/questions/` - Create new question
- `GET /api/v1/questions/{id}` - Get specific question
- `PUT /api/v1/questions/{id}` - Update question
- `DELETE /api/v1/questions/{id}` - Delete question

### Answers
- `GET /api/v1/answers/` - Get all answers
- `POST /api/v1/answers/` - Create new answer
- `GET /api/v1/answers/question/{question_id}` - Get answers for question

### Votes
- `POST /api/v1/votes/` - Create vote
- `GET /api/v1/votes/question/{question_id}` - Get votes for question

### Tags
- `GET /api/v1/tags/` - Get all tags
- `POST /api/v1/tags/` - Create new tag

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Set up a production database (PostgreSQL recommended)
2. Configure environment variables
3. Use a production ASGI server like Gunicorn with Uvicorn workers
4. Set up reverse proxy (Nginx)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or any static hosting service
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the API documentation at `http://localhost:8000/docs`
2. Review the console logs for error messages
3. Open an issue on GitHub

## 🔮 Future Enhancements

- [ ] Real-time notifications using WebSockets
- [ ] Rich text editor for questions and answers
- [ ] User profiles and reputation system
- [ ] Question bookmarking
- [ ] Advanced search with filters
- [ ] Email notifications
- [ ] Mobile app
- [ ] Dark mode theme
- [ ] Internationalization (i18n)
- [ ] Admin panel
- [ ] Analytics dashboard
