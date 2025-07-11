
import { auth } from '@clerk/nextjs/server';

// Define the base URL for our backend API
const API_URL = 'http://localhost:3001/api';

// This is a placeholder type. We will need to define the full Task and Subtask
// types based on the actual API response from the backend.
export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  subtasks?: unknown[]; // Replace `unknown` with a proper Subtask type later
  // Add other task properties here as we discover them from the API
}

/**
 * Fetches tasks for a given date from the backend.
 * This function is designed to be called from a React Server Component.
 *
 * @param {Date} date - The date for which to fetch tasks.
 * @returns {Promise<Task[]>} A promise that resolves to an array of tasks.
 */
export const getTasks = async (date: Date): Promise<Task[]> => {
  // On the server, auth() gives us access to the session and token
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    console.error('getTasks error: Not authenticated');
    // In a real app, you might throw an error or handle this case differently
    return [];
  }

  // Format the date to an ISO string for the query parameter
  const startDate = date.toISOString();

  // Construct the URL with query parameters, matching the iOS app's request
  const url = new URL(`${API_URL}/get-tasks`);
  url.searchParams.append('includeSubtasks', 'true');
  url.searchParams.append('type', 'all');
  url.searchParams.append('startDate', startDate);

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      // Use no-cache to ensure we always get fresh data on the server
      cache: 'no-cache',
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `Failed to fetch tasks: ${response.status} ${response.statusText}`,
        { errorBody }
      );
      // Return empty array on failure to prevent the page from crashing
      return [];
    }

    // It's safer to validate the shape of the data with Zod in a real app
    const data = await response.json();
    return data as Task[];
  } catch (error) {
    console.error('An unexpected error occurred while fetching tasks:', error);
    // Return empty array on unexpected errors
    return [];
  }
}; 