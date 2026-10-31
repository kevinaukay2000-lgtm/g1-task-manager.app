
import { getDeadlineLabel, isOverdue } from '../../utils/dateUtils';
import { STATUSES } from '../../constants';
import Badge from '../common/Badge';

/**
 * TaskCard displays an individual task's summary.
 * @param {Object} props
 * @param {Object} props.task - Task data.
 * @param {Function} props.onToggle - Callback to change status.
 * @param {Function} props.onEdit - Callback to edit task.
 * @param {Function} props.onDelete - Callback to delete task.
 */
const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  const isCompleted = task.status === STATUSES.COMPLETED;
  const overdue = !isCompleted && isOverdue(task.deadline);

  return (
    <div className={`task-card ${isCompleted ? 'completed' : ''} ${overdue ? 'overdue' : ''}`}>
      <div className="task-main">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={isCompleted}
          onChange={() => onToggle(task.id)}
        />
        <div className="task-details">
          <div className="task-header">
            <span className="task-title">{task.title}</span>
            <Badge type={task.priority.toLowerCase()}>{task.priority}</Badge>
          </div>
          <div className="task-meta">
            <span className="task-subject">{task.subject}</span>
            <span className={`task-deadline ${overdue ? 'text-danger' : ''}`}>
              {getDeadlineLabel(task.deadline)}
            </span>
          </div>
        </div>
      </div>
      <div className="task-actions">
        <button className="btn-icon" onClick={() => onEdit(task.id)} title="Edit">✏️</button>
        <button className="btn-icon" onClick={() => onDelete(task.id)} title="Delete">🗑️</button>
      </div>
    </div>
  );
};

export default TaskCard;
