// @/app/(app)/tasks/new/page.tsx
import { CreateTaskForm } from '@/components/create-task-form';

export default function NewTaskPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <CreateTaskForm />
    </div>
  );
} 