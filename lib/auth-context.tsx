'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMockUserByEmail } from '@/lib/mock-data';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');
    
    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockUser = getMockUserByEmail(email);
      
      if (!mockUser || mockUser.password !== password) {
        throw new Error('Invalid email or password');
      }

      const authUser: AuthUser = {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
      };

      // Create a mock JWT-like token
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(authUser))}.mock_signature`;

      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(authUser));
      setUser(authUser);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const existingUser = getMockUserByEmail(email);
      if (existingUser) {
        throw new Error('Email already exists');
      }

      // In a real app, we'd save this to the backend
      // For now, we'll just log in with the new credentials
      const authUser: AuthUser = {
        id: `user_${Date.now()}`,
        name,
        email,
      };

      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(authUser))}.mock_signature`;

      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(authUser));
      setUser(authUser);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
