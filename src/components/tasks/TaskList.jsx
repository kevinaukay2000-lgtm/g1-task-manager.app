import { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { filterTasks, sortTasks } from '../../utils/taskUtils';
import TaskCard from './TaskCard';

/**
 * TaskList displays a filtered and sorted list of tasks.
 */
const TaskList = ({ onEditTask, onDeleteTask, onToggleTask, onAddTask }) => {
  const { tasks, isLoading } = useTasks();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [subjectFilter] = useState('');
  const [sortBy, setSortBy] = useState('deadline');

  if (isLoading) return <div className="loading">Loading tasks...</div>;

  const filtered = filterTasks(tasks, {
    search,
    status: statusFilter,
    priority: priorityFilter,
    subject: subjectFilter
  });

  const sorted = sortTasks(filtered, sortBy);

  return (
    <div className="tasks-container">
      <div className="tasks-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-group">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="deadline">Sort by Deadline</option>
            <option value="priority">Sort by Priority</option>
            <option value="newest">Sort by Newest</option>
          </select>
        </div>
      </div>

      <div className="tasks-grid">
        {sorted.length === 0 ? (
          <div className="empty-state">
            <p>No tasks found. Time to relax or add a new one!</p>
            <button className="btn-primary" onClick={onAddTask}>+ Add Task</button>
          </div>
        ) : (
          sorted.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
