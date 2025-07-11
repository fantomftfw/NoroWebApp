import { getTasks, Task } from '@/lib/api/server/tasks';

/**
 * A React Server Component to fetch and display the list of tasks for today.
 */
export const TaskList = async () => {
  // Fetch tasks for the current day on the server.
  const today = new Date();
  const tasks: Task[] = await getTasks(today);

  if (tasks.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center pt-16 text-center">
        <div className="rounded-full bg-neutral-800 p-6">
          {/* Placeholder Icon */}
          <svg
            className="h-16 w-16 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-xl font-semibold text-white">
          Your task list is empty
        </h2>
        <p className="mt-2 text-neutral-400">
          Tap the + button to add a new goal.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3 px-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center gap-4 rounded-lg bg-neutral-800 p-4"
        >
          <div className="h-6 w-6 rounded-full border-2 border-neutral-600"></div>
          <span className="flex-1 text-white">{task.title}</span>
        </li>
      ))}
    </ul>
  );
}; 