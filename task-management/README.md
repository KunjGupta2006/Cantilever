# TaskFlow - MERN Stack Task Management Application

A production-quality full-stack Task Management application built with the MERN stack. Features secure JWT authentication, task CRUD operations, filtering, sorting, and a modern responsive UI.

## Features

- User Authentication (Register/Login/Logout)
- Secure JWT Authentication with 7-day expiry
- Task CRUD Operations
- Task Filtering (Status, Priority)
- Task Sorting (Newest, Oldest, Due Date, Priority)
- Full-text Search (Title, Description)
- Pagination
- Responsive Dashboard with Statistics
- Modern SaaS UI with Framer Motion Animations
- Toast Notifications
- Form Validation
- Rate Limiting & Security Headers
- Clean Architecture

## Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Axios
- Zustand (State Management)
- React Hook Form
- Tailwind CSS
- Framer Motion
- React Hot Toast
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs
- Zod Validation
- Helmet, CORS, Rate Limiting

## Installation

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd server
npm install

# Configure environment variables
cp .env .env
# Edit .env with your MongoDB URI and JWT secret

# Seed demo data (optional)
npm run seed

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd client
npm install

# Start development server
npm run dev
```

## Environment Variables

### Server (`server/.env`)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### Client (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

## Project Structure

```
task-management/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── api/              # Axios configuration
│   │   ├── components/       # Reusable components
│   │   │   ├── auth/        # Login/Register forms
│   │   │   ├── common/      # Modal, Loader, EmptyState
│   │   │   ├── layouts/     # Sidebar, Header, DashboardLayout
│   │   │   └── tasks/       # TaskCard, TaskForm, TaskFilters, TaskStats
│   │   ├── hooks/           # Custom hooks (useDebounce)
│   │   ├── pages/           # Login, Register, Dashboard, Profile
│   │   ├── routes/          # Protected/Public route guards
│   │   ├── store/           # Zustand stores (auth, task)
│   │   ├── styles/          # Tailwind CSS
│   │   ├── utils/           # Helpers (formatDate, cn)
│   │   └── App.jsx          # Root component with routing
│   └── package.json
│
├── server/                    # Express Backend
│   ├── src/
│   │   ├── config/          # DB connection, env config
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth, Error, Rate Limit
│   │   ├── models/          # User, Task schemas
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Token generation
│   │   └── validators/      # Zod schemas
│   ├── scripts/             # Seed data
│   └── package.json
│
└── README.md
```

## API Documentation

### Authentication

| Method | Endpoint            | Description  |
|--------|---------------------|--------------|
| POST   | /api/auth/register  | Register user |
| POST   | /api/auth/login     | Login user    |

### Tasks (Protected)

| Method | Endpoint           | Description      |
|--------|--------------------|------------------|
| GET    | /api/tasks         | Get all tasks    |
| GET    | /api/tasks/stats   | Get task stats   |
| GET    | /api/tasks/:id     | Get single task  |
| POST   | /api/tasks         | Create task      |
| PUT    | /api/tasks/:id     | Update task      |
| DELETE | /api/tasks/:id     | Delete task      |

### Query Parameters for GET /api/tasks

- `search` - Search by title or description
- `status` - Filter by status (pending, completed)
- `priority` - Filter by priority (low, medium, high)
- `sort` - Sort by (-createdAt, createdAt, dueDate, priority)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)

## Deployment

### Backend (Render / Railway / Vercel)
1. Set environment variables in your hosting platform
2. Build command: `npm install`
3. Start command: `npm start`

### Frontend (Vercel / Netlify)
1. Build command: `npm run build`
2. Output directory: `dist`
3. Set environment variable: `VITE_API_URL`

## Demo Credentials

After running seed script:
- Email: demo@example.com
- Password: password123
