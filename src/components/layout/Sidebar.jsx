
import { SCREENS } from '../../constants';

/**
 * Sidebar component for desktop navigation.
 * @param {Object} props
 * @param {string} props.activeScreen - The currently active screen ID.
 * @param {Function} props.onNavigate - Callback to change the active screen.
 */
const Sidebar = ({ activeScreen, onNavigate }) => {
  const menuItems = [
    { id: SCREENS.DASHBOARD, label: 'Dashboard', icon: '🏠' },
    { id: SCREENS.TASKS, label: 'My Tasks', icon: '📅' },
    { id: SCREENS.SETTINGS, label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Student Task Manager</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeScreen === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
