
import { useTasks } from '../hooks/useTasks';
import StatCard from '../components/dashboard/StatCard';
import ProgressBar from '../components/dashboard/ProgressBar';
import UpcomingList from '../components/dashboard/UpcomingList';

/**
 * DashboardScreen provides an overview of task progress and upcoming deadlines.
 */
const DashboardScreen = ({ onAddTask }) => {
  const { stats, isLoading } = useTasks();

  if (isLoading) return <div className="loading">Loading Dashboard...</div>;

  return (
    <div className="dashboard-container">
      <div className="stats-grid">
        <StatCard
          label="Total"
          value={stats.total}
          icon="📚"
          color="--primary-color"
        />
        <StatCard
          label="Pending"
          value={stats.pending}
          icon="⏳"
          color="--priority-medium"
        />
        <StatCard
          label="Completed"
          value={stats.completed}
          icon="✅"
          color="--priority-low"
        />
        <StatCard
          label="Overdue"
          value={stats.overdue}
          icon="🚨"
          color="--priority-high"
        />
      </div>

      <div className="dashboard-progress">
        <ProgressBar progress={stats.progress} label="Overall Completion" />
      </div>

      <UpcomingList />

      <div className="dashboard-cta">
        <button className="btn-primary" onClick={onAddTask}>
          + Add New Task
        </button>
      </div>
    </div>
  );
};

export default DashboardScreen;
