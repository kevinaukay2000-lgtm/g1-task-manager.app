import { useTasksContext } from '../context/TaskContext';

/**
 * Custom hook to access task state and operations.
 */
export function useTasks() {
  return useTasksContext();
}
