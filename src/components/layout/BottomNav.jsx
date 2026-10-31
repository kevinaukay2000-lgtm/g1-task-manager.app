
import { SCREENS } from '../../constants';

/**
 * Bottom navigation bar for mobile and tablet devices.
 * @param {Object} props
 * @param {string} props.activeScreen - The currently active screen ID.
 * @param {Function} props.onNavigate - Callback to change the active screen.
 */
const BottomNav = ({ activeScreen, onNavigate }) => {
  const menuItems = [
    { id: SCREENS.DASHBOARD, label: 'Home', icon: '🏠' },
    { id: SCREENS.TASKS, label: 'Tasks', icon: '📅' },
    { id: SCREENS.SETTINGS, label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav className="bottom-nav">
      {menuItems.map(item => (
        <button
          key={item.id}
          className={`nav-item ${activeScreen === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}
        >
          <div className="nav-icon">{item.icon}</div>
          <div className="nav-label">{item.label}</div>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
