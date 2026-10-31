
import { useToast } from '../../context/ToastContext';

/**
 * Toast component for floating notifications.
 */
const Toast = () => {
  const { toast } = useToast();

  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type}`}>
      {toast.message}
    </div>
  );
};

export default Toast;
