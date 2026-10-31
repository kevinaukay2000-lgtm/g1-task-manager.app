
import TaskForm from '../components/tasks/TaskForm';

/**
 * TaskFormScreen wrapper for the TaskForm component.
 */
const TaskFormScreen = ({ taskId, onCancel }) => {
  return (
    <div className="screen-content">
      <TaskForm
        taskId={taskId}
        onCancel={onCancel}
        onSuccess={() => onCancel()}
      />
    </div>
  );
};

export default TaskFormScreen;
