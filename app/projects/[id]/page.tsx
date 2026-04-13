'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTaskContext } from '@/lib/task-context';
import { useAuth } from '@/lib/auth-context';
import { Plus, ChevronLeft, Trash2 } from 'lucide-react';
import { CreateTaskDialog } from '@/components/create-task-dialog';
import { TaskCard } from '@/components/task-card';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'in_progress' | 'done'>('all');

  const { projects, getTasksByProject } = useTaskContext();
  const { user } = useAuth();

  const project = projects.find(p => p.id === projectId);
  const tasks = getTasksByProject(projectId);

  const filteredTasks = useMemo(() => {
    if (statusFilter === 'all') return tasks;
    return tasks.filter(t => t.status === statusFilter);
  }, [tasks, statusFilter]);

  const groupedByStatus = {
    todo: filteredTasks.filter(t => t.status === 'todo'),
    in_progress: filteredTasks.filter(t => t.status === 'in_progress'),
    done: filteredTasks.filter(t => t.status === 'done'),
  };

  if (!project) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Project not found</h1>
          <Link href="/projects">
            <Button variant="outline">Back to Projects</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/projects" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4">
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Projects</span>
        </Link>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            {project.description && (
              <p className="text-gray-600 mt-2">{project.description}</p>
            )}
          </div>

          {user?.id === project.owner_id && (
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Project
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{tasks.length}</p>
              <p className="text-gray-600 text-sm mt-1">Total Tasks</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {tasks.filter(t => t.status === 'todo').length}
              </p>
              <p className="text-gray-600 text-sm mt-1">To Do</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">
                {tasks.filter(t => t.status === 'in_progress').length}
              </p>
              <p className="text-gray-600 text-sm mt-1">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {tasks.filter(t => t.status === 'done').length}
              </p>
              <p className="text-gray-600 text-sm mt-1">Done</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button onClick={() => setShowCreateTask(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Task</span>
        </Button>
      </div>

      <Tabs defaultValue="all" onValueChange={(value) => setStatusFilter(value as any)}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="todo">To Do</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="done">Done</TabsTrigger>
        </TabsList>

        {statusFilter === 'all' ? (
          <>
            {/* Kanban-like view */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* To Do Column */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="h-3 w-3 bg-blue-500 rounded-full mr-2" />
                  To Do ({groupedByStatus.todo.length})
                </h3>
                <div className="space-y-3">
                  {groupedByStatus.todo.length === 0 ? (
                    <p className="text-gray-400 text-sm p-4 bg-gray-50 rounded">No tasks</p>
                  ) : (
                    groupedByStatus.todo.map(task => (
                      <TaskCard key={task.id} task={task} projectId={projectId} />
                    ))
                  )}
                </div>
              </div>

              {/* In Progress Column */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="h-3 w-3 bg-yellow-500 rounded-full mr-2" />
                  In Progress ({groupedByStatus.in_progress.length})
                </h3>
                <div className="space-y-3">
                  {groupedByStatus.in_progress.length === 0 ? (
                    <p className="text-gray-400 text-sm p-4 bg-gray-50 rounded">No tasks</p>
                  ) : (
                    groupedByStatus.in_progress.map(task => (
                      <TaskCard key={task.id} task={task} projectId={projectId} />
                    ))
                  )}
                </div>
              </div>

              {/* Done Column */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="h-3 w-3 bg-green-500 rounded-full mr-2" />
                  Done ({groupedByStatus.done.length})
                </h3>
                <div className="space-y-3">
                  {groupedByStatus.done.length === 0 ? (
                    <p className="text-gray-400 text-sm p-4 bg-gray-50 rounded">No tasks</p>
                  ) : (
                    groupedByStatus.done.map(task => (
                      <TaskCard key={task.id} task={task} projectId={projectId} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <TabsContent value={statusFilter} className="space-y-3">
            {filteredTasks.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-gray-500">No tasks in this category</p>
                </CardContent>
              </Card>
            ) : (
              filteredTasks.map(task => (
                <TaskCard key={task.id} task={task} projectId={projectId} />
              ))
            )}
          </TabsContent>
        )}
      </Tabs>

      <CreateTaskDialog
        open={showCreateTask}
        onOpenChange={setShowCreateTask}
        projectId={projectId}
      />
    </main>
  );
}
