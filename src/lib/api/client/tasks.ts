// Define the base URL for our backend API
const API_URL = 'http://localhost:3001/api';

// Enums and Types for creating a task, used by client components.

export const TASK_DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

export const TASK_TYPE = {
  PLANNED: 'planned',
  UNPLANNED: 'unplanned', // Assuming another type might exist
} as const;

export interface TaskInput {
  title: string;
  difficulty: (typeof TASK_DIFFICULTY)[keyof typeof TASK_DIFFICULTY];
  description?: string;
  type: (typeof TASK_TYPE)[keyof typeof TASK_TYPE];
  startUTCTimestamp: string;
}

/**
 * Creates a new task by sending a request to the backend.
 * This function is designed to be called from a Client Component.
 *
 * @param {string} token - The user's authentication token.
 * @param {TaskInput} taskInput - The task data to be sent.
 * @returns {Promise<void>} A promise that resolves when the task is created.
 */
export const createTask = async (
  token: string,
  taskInput: TaskInput
): Promise<void> => {
  const url = `${API_URL}/create-task`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskInput),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to create task: ${response.status} ${response.statusText} - ${errorBody}`
    );
  }

  // The backend might return the created task, but for now, we don't use it.
  return;
}; 