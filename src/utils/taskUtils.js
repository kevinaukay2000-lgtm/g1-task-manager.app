import { PRIORITIES, STATUSES } from '../constants';

/**
 * Generates a unique ID for tasks.
 * @returns {string}
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

/**
 * Filters tasks based on search query, status, priority, and subject.
 * @param {Array} tasks
 * @param {Object} filters - { search, status, priority, subject }
 * @returns {Array}
 */
export function filterTasks(tasks, { search, status, priority, subject }) {
  return tasks.filter(task => {
    const matchesSearch = !search ||
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !status || task.status === status;
    const matchesPriority = !priority || task.priority === priority;
    const matchesSubject = !subject || task.subject === subject;

    return matchesSearch && matchesStatus && matchesPriority && matchesSubject;
  });
}

/**
 * Sorts tasks based on criteria.
 * @param {Array} tasks
 * @param {string} sortBy - 'deadline', 'priority', 'newest'
 * @returns {Array}
 */
export function sortTasks(tasks, sortBy) {
  const priorityMap = { [PRIORITIES.HIGH]: 3, [PRIORITIES.MEDIUM]: 2, [PRIORITIES.LOW]: 1 };

  return [...tasks].sort((a, b) => {
    if (sortBy === 'deadline') return a.deadline.localeCompare(b.deadline);
    if (sortBy === 'priority') return priorityMap[b.priority] - priorityMap[a.priority];
    if (sortBy === 'newest') return b.createdAt.localeCompare(a.createdAt);
    return 0;
  });
}

/**
 * Calculates task statistics for the dashboard.
 * @param {Array} tasks
 * @returns {Object}
 */
export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === STATUSES.COMPLETED).length;
  const pending = total - completed;
  const overdue = tasks.filter(t => t.status === STATUSES.PENDING && t.deadline < new Date().toISOString().split('T')[0]).length;
  const upcoming = tasks.filter(t => t.status === STATUSES.PENDING &&
    (new Date(t.deadline) - new Date()) / (1000 * 60 * 60 * 24) <= 7 &&
    t.deadline >= new Date().toISOString().split('T')[0]).length;

  return {
    total,
    completed,
    pending,
    overdue,
    upcoming,
    progress: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}
