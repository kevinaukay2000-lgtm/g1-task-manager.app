/**
 * Utility functions for date manipulation and deadline logic.
 */

/**
 * Formats a date to YYYY-MM-DD.
 * @param {Date} date
 * @returns {string}
 */
export function formatDate(date) {
  return date.toISOString().split('T')[0];
}

/**
 * Gets today's date in YYYY-MM-DD format.
 * @returns {string}
 */
export function getToday() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Calculates the difference in days between two date strings.
 * @param {string} dateA - YYYY-MM-DD
 * @param {string} dateB - YYYY-MM-DD
 * @returns {number} Difference in days (positive if dateA is after dateB)
 */
export function daysUntil(deadline) {
  const today = new Date(getToday());
  const target = new Date(deadline);
  const diffTime = target - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Checks if a task is overdue.
 * @param {string} deadline - YYYY-MM-DD
 * @returns {boolean}
 */
export function isOverdue(deadline) {
  return deadline < getToday();
}

/**
 * Checks if a task is upcoming (due within 7 days).
 * @param {string} deadline - YYYY-MM-DD
 * @returns {boolean}
 */
export function isUpcoming(deadline) {
  const diff = daysUntil(deadline);
  return diff >= 0 && diff <= 7;
}

/**
 * Returns a human-friendly deadline label.
 * @param {string} deadline - YYYY-MM-DD
 * @returns {string}
 */
export function getDeadlineLabel(deadline) {
  const today = getToday();
  if (deadline === today) return 'Due today';

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (deadline === formatDate(tomorrow)) return 'Due tomorrow';

  const diff = daysUntil(deadline);
  if (diff < 0) return `${Math.abs(diff)} days overdue`;
  if (diff <= 7) return `${diff} days left`;

  return 'Upcoming';
}
