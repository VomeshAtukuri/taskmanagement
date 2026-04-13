'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import { useTaskContext } from '@/lib/task-context';
import { Plus, FolderOpen } from 'lucide-react';
import { CreateProjectDialog } from '@/components/create-project-dialog';

export default function ProjectsPage() {
  const { user } = useAuth();
  const { projects, getTasksByProject } = useTaskContext();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Get projects owned by the current user
  const userProjects = projects.filter(p => p.owner_id === user?.id);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-2">Manage your projects and tasks</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </Button>
      </div>

      {userProjects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FolderOpen className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No projects yet</p>
            <p className="text-gray-400 mt-2">Create your first project to get started</p>
            <Button onClick={() => setShowCreateDialog(true)} variant="outline" className="mt-4">
              Create Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProjects.map((project) => {
            const tasks = getTasksByProject(project.id);
            const taskStats = {
              total: tasks.length,
              todo: tasks.filter(t => t.status === 'todo').length,
              inProgress: tasks.filter(t => t.status === 'in_progress').length,
              done: tasks.filter(t => t.status === 'done').length,
            };

            return (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description || 'No description'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Tasks</span>
                        <span className="font-semibold">{taskStats.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">To Do</span>
                        <span className="text-blue-600 font-semibold">{taskStats.todo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">In Progress</span>
                        <span className="text-yellow-600 font-semibold">{taskStats.inProgress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Done</span>
                        <span className="text-green-600 font-semibold">{taskStats.done}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      <CreateProjectDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </main>
  );
}
