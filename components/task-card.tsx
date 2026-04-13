'use client';

import { useState } from 'react';
import { Task } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2 } from 'lucide-react';
import { useTaskContext } from '@/lib/task-context';
import { getMockUserById } from '@/lib/mock-data';
import { EditTaskDialog } from './edit-task-dialog';

interface TaskCardProps {
  task: Task;
  projectId: string;
}

export function TaskCard({ task, projectId }: TaskCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { deleteTask } = useTaskContext();
  const assignee = task.assignee_id ? getMockUserById(task.assignee_id) : null;

  const priorityColor = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const statusColor = {
    todo: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    done: 'bg-green-100 text-green-800',
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{task.title}</h3>

          {task.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
          )}

          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className={priorityColor[task.priority]}>
              {task.priority}
            </Badge>
            <Badge className={statusColor[task.status]}>
              {task.status.replace('_', ' ')}
            </Badge>
          </div>

          {task.due_date && (
            <p className="text-xs text-gray-500 mb-3">
              Due: {new Date(task.due_date).toLocaleDateString()}
            </p>
          )}

          {assignee && (
            <p className="text-xs text-gray-600 mb-3">
              Assigned to: {assignee.name}
            </p>
          )}

          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowEditDialog(true)}
              className="flex-1 flex items-center justify-center space-x-1"
            >
              <Edit2 className="h-3 w-3" />
              <span>Edit</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => deleteTask(task.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <EditTaskDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        task={task}
        projectId={projectId}
      />
    </>
  );
}
