import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import storage from '../services/storage';
import { STORAGE_KEYS, DEFAULT_SUBJECTS, STATUSES } from '../constants';
import { getTaskStats } from '../utils/taskUtils';

/**
 * TaskContext provides global state for tasks and subjects.
 */
const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS);
  const [isLoading, setIsLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    async function loadData() {
      try {
        const savedTasks = await storage.getItem(STORAGE_KEYS.TASKS);
        const savedSubjects = await storage.getItem(STORAGE_KEYS.SUBJECTS);

        if (savedTasks) setTasks(savedTasks);
        if (savedSubjects) setSubjects(savedSubjects);
        else await storage.setItem(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);

        // Seed initial data if no tasks exist
        if (!savedTasks) {
          const seedTasks = [
            {
              id: 'seed-1',
              title: 'Welcome to Task Manager!',
              description: 'Try adding your first assignment here.',
              subject: 'Computer',
              priority: 'Low',
              deadline: new Date().toISOString().split('T')[0],
              status: STATUSES.PENDING,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              id: 'seed-2',
              title: 'Complete Project Proposal',
              description: 'Draft the initial scope and timeline.',
              subject: 'Science',
              priority: 'High',
              deadline: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
              status: STATUSES.PENDING,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              id: 'seed-3',
              title: 'Read History Chapter 4',
              description: 'Focus on the industrial revolution.',
              subject: 'History',
              priority: 'Medium',
              deadline: new Date(Date.now() - 86400000).toISOString().split('T')[0],
              status: STATUSES.PENDING,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          ];
          setTasks(seedTasks);
          await storage.setItem(STORAGE_KEYS.TASKS, seedTasks);
        }
      } catch (error) {
        console.error('Failed to load task data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Persist tasks whenever they change
  useEffect(() => {
    if (!isLoading) {
      storage.setItem(STORAGE_KEYS.TASKS, tasks);
    }
  }, [tasks, isLoading]);

  // Persist subjects whenever they change
  useEffect(() => {
    if (!isLoading) {
      storage.setItem(STORAGE_KEYS.SUBJECTS, subjects);
    }
  }, [subjects, isLoading]);

  // Task CRUD operations
  const addTask = async (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
  };

  const updateTask = async (id, updates) => {
    const newTasks = tasks.map(t => t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t);
    setTasks(newTasks);
  };

  const deleteTask = async (id) => {
    const newTasks = tasks.filter(t => t.id !== id);
    setTasks(newTasks);
  };

  const toggleTaskStatus = async (id) => {
    const newTasks = tasks.map(t => {
      if (t.id === id) {
        const newStatus = t.status === STATUSES.PENDING ? STATUSES.COMPLETED : STATUSES.PENDING;
        return {
          ...t,
          status: newStatus,
          completedAt: newStatus === STATUSES.COMPLETED ? new Date().toISOString() : null,
          updatedAt: new Date().toISOString()
        };
      }
      return t;
    });
    setTasks(newTasks);
  };

  // Subject Management
  const addSubject = async (name) => {
    const newSubjects = [...subjects, name];
    setSubjects(newSubjects);
  };

  const renameSubject = async (oldName, newName) => {
    const newSubjects = subjects.map(s => s === oldName ? newName : s);
    const newTasks = tasks.map(t => t.subject === oldName ? { ...t, subject: newName } : t);
    setSubjects(newSubjects);
    setTasks(newTasks);
  };

  const deleteSubject = async (name) => {
    const newSubjects = subjects.filter(s => s !== name);
    const newTasks = tasks.map(t => t.subject === name ? { ...t, subject: 'Unassigned' } : t);
    setSubjects(newSubjects);
    setTasks(newTasks);
  };

  const clearCompletedTasks = async () => {
    const newTasks = tasks.filter(t => t.status !== STATUSES.COMPLETED);
    setTasks(newTasks);
  };

  const resetAllData = async () => {
    setTasks([]);
    setSubjects(DEFAULT_SUBJECTS);
    await storage.clear();
    await storage.setItem(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
  };

  const stats = useMemo(() => getTaskStats(tasks), [tasks]);

  const value = {
    tasks,
    subjects,
    isLoading,
    stats,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    addSubject,
    renameSubject,
    deleteSubject,
    clearCompletedTasks,
    resetAllData,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasksContext() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasksContext must be used within a TaskProvider');
  return context;
}
