import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In real app, this would be hashed
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  project_id: string;
  assignee_id?: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  created_at: string;
}

// Mock users
const mockUsers: User[] = [
  {
    id: uuidv4(),
    name: 'John Doe',
    email: 'test@example.com',
    password: 'password123',
    created_at: '2026-01-01T10:00:00Z',
  },
  {
    id: uuidv4(),
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    created_at: '2026-01-02T10:00:00Z',
  },
  {
    id: uuidv4(),
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'password123',
    created_at: '2026-01-03T10:00:00Z',
  },
];

const user1 = mockUsers[0];
const user2 = mockUsers[1];
const user3 = mockUsers[2];

// Mock projects
export const mockProjects: Project[] = [
  {
    id: uuidv4(),
    name: 'Website Redesign',
    description: 'Redesign the company website for Q2 2026',
    owner_id: user1.id,
    created_at: '2026-01-05T10:00:00Z',
  },
  {
    id: uuidv4(),
    name: 'Mobile App MVP',
    description: 'Build a minimum viable product for iOS',
    owner_id: user1.id,
    created_at: '2026-01-10T10:00:00Z',
  },
  {
    id: uuidv4(),
    name: 'API Documentation',
    description: 'Complete the API documentation',
    owner_id: user2.id,
    created_at: '2026-01-15T10:00:00Z',
  },
];

const project1 = mockProjects[0];
const project2 = mockProjects[1];
const project3 = mockProjects[2];

// Mock tasks
export const mockTasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Design homepage',
    description: 'Create mockups and wireframes for the new homepage',
    status: 'in_progress',
    priority: 'high',
    project_id: project1.id,
    assignee_id: user1.id,
    due_date: '2026-04-15',
    created_at: '2026-01-05T10:30:00Z',
    updated_at: '2026-01-05T10:30:00Z',
  },
  {
    id: uuidv4(),
    title: 'Implement responsive layout',
    description: 'Make the homepage responsive for mobile devices',
    status: 'todo',
    priority: 'high',
    project_id: project1.id,
    assignee_id: user2.id,
    due_date: '2026-04-20',
    created_at: '2026-01-06T10:00:00Z',
    updated_at: '2026-01-06T10:00:00Z',
  },
  {
    id: uuidv4(),
    title: 'Set up database',
    description: 'Configure PostgreSQL and create initial schema',
    status: 'done',
    priority: 'high',
    project_id: project1.id,
    assignee_id: user1.id,
    due_date: '2026-04-10',
    created_at: '2026-01-04T10:00:00Z',
    updated_at: '2026-01-05T14:30:00Z',
  },
  {
    id: uuidv4(),
    title: 'Create user authentication',
    description: 'Implement JWT-based authentication system',
    status: 'in_progress',
    priority: 'high',
    project_id: project2.id,
    assignee_id: user1.id,
    due_date: '2026-04-18',
    created_at: '2026-01-10T11:00:00Z',
    updated_at: '2026-01-10T11:00:00Z',
  },
  {
    id: uuidv4(),
    title: 'Build push notification system',
    description: 'Integrate Firebase Cloud Messaging for notifications',
    status: 'todo',
    priority: 'medium',
    project_id: project2.id,
    assignee_id: user3.id,
    due_date: '2026-04-25',
    created_at: '2026-01-11T10:00:00Z',
    updated_at: '2026-01-11T10:00:00Z',
  },
  {
    id: uuidv4(),
    title: 'Write API endpoint docs',
    description: 'Document all REST endpoints with examples',
    status: 'in_progress',
    priority: 'medium',
    project_id: project3.id,
    assignee_id: user2.id,
    due_date: '2026-04-22',
    created_at: '2026-01-15T10:00:00Z',
    updated_at: '2026-01-15T10:00:00Z',
  },
  {
    id: uuidv4(),
    title: 'Add authentication section',
    description: 'Document auth endpoints and JWT flow',
    status: 'todo',
    priority: 'high',
    project_id: project3.id,
    due_date: '2026-04-24',
    created_at: '2026-01-16T10:00:00Z',
    updated_at: '2026-01-16T10:00:00Z',
  },
];

export function getMockUsers() {
  return mockUsers;
}

export function getMockUserById(id: string) {
  return mockUsers.find(u => u.id === id);
}

export function getMockUserByEmail(email: string) {
  return mockUsers.find(u => u.email === email);
}

export function getMockProjectsByUserId(userId: string) {
  return mockProjects.filter(p => p.owner_id === userId);
}

export function getMockProjectById(id: string) {
  return mockProjects.find(p => p.id === id);
}

export function getMockTasksByProjectId(projectId: string) {
  return mockTasks.filter(t => t.project_id === projectId);
}

export function getMockTaskById(id: string) {
  return mockTasks.find(t => t.id === id);
}
