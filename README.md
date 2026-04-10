# TaskFlow - Task Management System

A modern task management application built with Next.js, React, and shadcn/ui. This is a full-featured task management system where users can create projects, manage tasks, assign work to team members, and track progress.

## Features

- **Authentication**: Register and login with email/password
- **Projects**: Create and manage multiple projects
- **Tasks**: Create, edit, and delete tasks with full control
- **Task Management**: 
  - Set task status (To Do, In Progress, Done)
  - Set priority levels (Low, Medium, High)
  - Assign tasks to team members
  - Set due dates for tasks
  - View task descriptions
- **Dashboard**: 
  - Projects overview with task statistics
  - Kanban-style task board view
  - Filterable task lists
  - Task count statistics per project
- **Responsive Design**: Works seamlessly on mobile (375px) and desktop (1280px)

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context API (Auth + Tasks)
- **Data**: Mock in-memory data with localStorage for auth persistence
- **UI Components**: shadcn/ui (Button, Card, Dialog, Form, etc.)

## Architecture Decisions

### Client-Side Only with Mock Data
Since this is a demonstration, the entire application runs client-side with mock data. In a production system, this would connect to a real backend API and database.

### Auth Context
- Manages user authentication state globally
- Persists auth token and user data to localStorage
- Provides login/register/logout functionality
- JWT-like token stored for session management

### Task Context
- Manages all projects and tasks globally
- Provides CRUD operations for tasks and projects
- Simulates real-time updates with React state

### Component Structure
- **Protected Routes**: Redirect unauthenticated users to login
- **Navbar**: Shows logged-in user info and logout button
- **Dialogs**: Create/Edit tasks and projects in modal dialogs
- **Kanban View**: Task cards grouped by status in columns

### Tradeoffs & Limitations
- **No Backend**: Mock data is stored in-memory. Data is lost on refresh (but auth persists in localStorage)
- **No Database**: Single source of truth is React context, not a persistent database
- **No Real API**: Would add 20+ endpoints in production (auth, projects, tasks, filters, stats)
- **Simplified Auth**: Uses plaintext password comparison; production would use bcrypt + JWT signing
- **No Drag-and-Drop**: Tasks can be edited manually, but no drag-and-drop reordering
- **No Real-Time**: No WebSocket support for live updates across users
- **No Pagination**: All data loads at once (fine for small datasets)

## Running Locally

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser
# http://localhost:3000
```

The app will redirect you to the login page. Use demo credentials or create a new account.

## Test Credentials

Pre-populated demo account:
- **Email**: test@example.com
- **Password**: password123

Other demo users available:
- jane@example.com / password123
- bob@example.com / password123

## Mock Data

The application comes with 3 pre-loaded demo users, 3 projects, and 7 tasks across those projects. All data is initialized in `lib/mock-data.ts`.

## Project Structure

```
app/
  ├── page.tsx              # Home (redirects to /projects or /login)
  ├── login/
  │   └── page.tsx          # Login page
  ├── register/
  │   └── page.tsx          # Registration page
  ├── projects/
  │   ├── layout.tsx        # Protected layout with navbar
  │   ├── page.tsx          # Projects list
  │   └── [id]/
  │       └── page.tsx      # Project detail with tasks
  └── layout.tsx            # Root layout with providers

components/
  ├── navbar.tsx            # Top navigation bar
  ├── protected-route.tsx   # Auth protection wrapper
  ├── task-card.tsx         # Task display card
  ├── create-task-dialog.tsx  # New task form
  ├── edit-task-dialog.tsx    # Edit task form
  └── create-project-dialog.tsx # New project form

lib/
  ├── auth-context.tsx      # Authentication context & hooks
  ├── task-context.tsx      # Task/project management context
  ├── mock-data.ts          # Mock users, projects, tasks
  └── utils.ts              # Utility functions
```

## Key Features Explained

### Authentication Flow
1. User arrives at `/` which redirects to `/login` if not authenticated
2. User logs in or registers
3. Auth token and user data stored in localStorage
4. Protected routes check auth status and redirect if needed
5. User can logout, clearing stored data

### Projects Dashboard
- Lists all projects owned by the current user
- Shows task statistics per project
- Create new projects with name and description
- Click project to view details

### Project Detail Page
- View all tasks in a project
- Kanban board view with 3 columns (To Do, In Progress, Done)
- Task statistics at the top
- Filter tasks by status using tabs
- Create new tasks
- Edit or delete existing tasks

### Task Management
- Create tasks with title, description, priority, assignee, due date
- Edit any task properties
- Delete tasks (owner only in full implementation)
- View task details on cards
- Optimistic UI updates

## What Would Be Added With More Time

### Backend & Database
- Express.js or Go backend API
- PostgreSQL database with proper schema
- Database migrations for version control
- Proper password hashing with bcrypt
- JWT token validation and signing
- API error handling and validation

### Enhanced Features
- Drag-and-drop task reordering
- Task comments and activity logs
- Task attachments and file uploads
- Invite team members to projects
- Real-time updates via WebSockets
- Notification system
- Search and advanced filtering
- Project templates
- Time tracking per task
- Custom task fields

### UI/UX Improvements
- Dark mode toggle
- Keyboard shortcuts
- Task bulk actions
- Undo/redo functionality
- Better empty states with illustrations
- Loading skeletons
- Accessibility improvements (ARIA labels)
- Smooth animations and transitions

### Testing & DevOps
- Unit tests with Vitest
- Integration tests for API endpoints
- E2E tests with Playwright
- Docker containerization
- CI/CD pipeline (GitHub Actions)
- Error tracking (Sentry)
- Performance monitoring

### Security
- CORS configuration
- Rate limiting
- Input validation & sanitization
- SQL injection prevention (parameterized queries)
- XSS protection
- CSRF tokens
- Environment variable management
- Audit logging

## API Reference (For Future Backend)

When a backend is implemented, the following endpoints would be created:

### Authentication
- `POST /auth/register` - Create new user account
- `POST /auth/login` - Login and get JWT token

### Projects
- `GET /projects` - List user's projects
- `POST /projects` - Create new project
- `GET /projects/:id` - Get project details with tasks
- `PATCH /projects/:id` - Update project (owner only)
- `DELETE /projects/:id` - Delete project (owner only)

### Tasks
- `GET /projects/:id/tasks` - List project tasks with filters
- `POST /projects/:id/tasks` - Create task in project
- `PATCH /tasks/:id` - Update task details
- `DELETE /tasks/:id` - Delete task

### Filters & Stats
- `GET /projects/:id/stats` - Get task statistics
- Query params: `status=`, `assignee=`, `priority=`, `page=`, `limit=`

## Notes

- This is a frontend-first implementation suitable for prototyping and demonstrations
- All data is ephemeral and will be reset on page refresh (except auth token)
- For production use, connect to a real backend API with persistent database
- The UI is fully responsive and works on all screen sizes
