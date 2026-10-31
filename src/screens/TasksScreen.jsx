
import { useTasks } from '../hooks/useTasks';
import TaskList from '../components/tasks/TaskList';

/**
 * TasksScreen displays the list of tasks with filters and search.
 */
const TasksScreen = ({ onEditTask, onAddTask }) => {
  const { toggleTaskStatus, deleteTask } = useTasks();

  return (
    <div className="screen-content">
      <TaskList
        onEditTask={onEditTask}
        onDeleteTask={deleteTask}
        onToggleTask={toggleTaskStatus}
        onAddTask={onAddTask}
      />
    </div>
  );
};

export default TasksScreen;
