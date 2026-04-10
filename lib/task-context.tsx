'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Task, mockTasks, mockProjects } from './mock-data';
import { v4 as uuidv4 } from 'uuid';

interface TaskContextType {
  tasks: Task[];
  projects: typeof mockProjects;
  addTask: (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasksByProject: (projectId: string) => Task[];
  addProject: (project: Omit<typeof mockProjects[0], 'id' | 'created_at'>) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [projects, setProjects] = useState(mockProjects);

  const addTask = useCallback((newTask: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    const task: Task = {
      ...newTask,
      id: uuidv4(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setTasks(prev => [...prev, task]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, ...updates, updated_at: new Date().toISOString() }
          : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const getTasksByProject = useCallback((projectId: string) => {
    return tasks.filter(task => task.project_id === projectId);
  }, [tasks]);

  const addProject = useCallback((newProject: Omit<typeof mockProjects[0], 'id' | 'created_at'>) => {
    const project = {
      ...newProject,
      id: uuidv4(),
      created_at: new Date().toISOString(),
    };
    setProjects(prev => [...prev, project]);
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, projects, addTask, updateTask, deleteTask, getTasksByProject, addProject }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}
