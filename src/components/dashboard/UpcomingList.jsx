
import { useTasks } from '../../hooks/useTasks';
import { isUpcoming, getDeadlineLabel } from '../../utils/dateUtils';

/**
 * UpcomingList displays a list of the next tasks due.
 */
const UpcomingList = () => {
  const { tasks } = useTasks();

  const upcomingTasks = tasks
    .filter(t => t.status === 'pending' && isUpcoming(t.deadline))
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 5);

  if (upcomingTasks.length === 0) {
    return (
      <div className="upcoming-empty">
        <p>No upcoming deadlines for the next 7 days. Relax! 🎉</p>
      </div>
    );
  }

  return (
    <div className="upcoming-list">
      <h3>Upcoming Deadlines</h3>
      <div className="upcoming-items">
        {upcomingTasks.map(task => (
          <div key={task.id} className="upcoming-item">
            <div className="upcoming-task-info">
              <span className="upcoming-title">{task.title}</span>
              <span className="upcoming-subject">{task.subject}</span>
            </div>
            <div className="upcoming-date">
              {getDeadlineLabel(task.deadline)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingList;
