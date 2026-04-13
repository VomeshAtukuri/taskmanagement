CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    status      VARCHAR(20)  NOT NULL DEFAULT 'todo'
                CHECK (status IN ('todo', 'in_progress', 'done')),
    priority    VARCHAR(10)  NOT NULL DEFAULT 'medium'
                CHECK (priority IN ('low', 'medium', 'high')),
    project_id  UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    assignee_id UUID REFERENCES users(id) ON DELETE SET NULL,
    due_date    DATE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tasks_project_id  ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assignee_id ON tasks(assignee_id);
CREATE INDEX IF NOT EXISTS idx_projects_owner_id ON projects(owner_id);

-- Seed data
INSERT INTO users (id, name, email, password) VALUES
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'John Doe',    'test@example.com', 'password123'),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Jane Smith',  'jane@example.com', 'password123'),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Bob Johnson', 'bob@example.com',  'password123')
ON CONFLICT (email) DO NOTHING;

INSERT INTO projects (id, name, description, owner_id) VALUES
    ('d4e5f6a7-b8c9-0123-defa-234567890123', 'Website Redesign',    'Redesign the company website for Q2 2026', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'),
    ('e5f6a7b8-c9d0-1234-efab-345678901234', 'Mobile App MVP',      'Build a minimum viable product for iOS',   'a1b2c3d4-e5f6-7890-abcd-ef1234567890'),
    ('f6a7b8c9-d0e1-2345-fabc-456789012345', 'API Documentation',   'Complete the API documentation',            'b2c3d4e5-f6a7-8901-bcde-f12345678901')
ON CONFLICT DO NOTHING;

INSERT INTO tasks (title, description, status, priority, project_id, assignee_id, due_date) VALUES
    ('Design homepage',              'Create mockups and wireframes for the new homepage',      'in_progress', 'high',   'd4e5f6a7-b8c9-0123-defa-234567890123', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-04-15'),
    ('Implement responsive layout',  'Make the homepage responsive for mobile devices',         'todo',        'high',   'd4e5f6a7-b8c9-0123-defa-234567890123', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', '2026-04-20'),
    ('Set up database',              'Configure PostgreSQL and create initial schema',          'done',        'high',   'd4e5f6a7-b8c9-0123-defa-234567890123', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-04-10'),
    ('Create user authentication',   'Implement JWT-based authentication system',               'in_progress', 'high',   'e5f6a7b8-c9d0-1234-efab-345678901234', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-04-18'),
    ('Build push notification system','Integrate Firebase Cloud Messaging for notifications',   'todo',        'medium', 'e5f6a7b8-c9d0-1234-efab-345678901234', 'c3d4e5f6-a7b8-9012-cdef-123456789012', '2026-04-25'),
    ('Write API endpoint docs',      'Document all REST endpoints with examples',               'in_progress', 'medium', 'f6a7b8c9-d0e1-2345-fabc-456789012345', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', '2026-04-22'),
    ('Add authentication section',   'Document auth endpoints and JWT flow',                    'todo',        'high',   'f6a7b8c9-d0e1-2345-fabc-456789012345', NULL,                                    '2026-04-24');
