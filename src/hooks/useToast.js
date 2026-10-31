import { useToast } from '../context/ToastContext';

/**
 * Custom hook to trigger toast notifications.
 */
export function useToastNotifications() {
  const { showToast } = useToast();

  return {
    info: (msg) => showToast(msg, 'info'),
    success: (msg) => showToast(msg, 'success'),
    error: (msg) => showToast(msg, 'error'),
    warning: (msg) => showToast(msg, 'warning'),
  };
}
