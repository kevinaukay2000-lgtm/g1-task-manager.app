import { useState, Suspense } from 'react';
import { SCREENS } from './constants';

import { TaskProvider } from './context/TaskContext';
import { SettingsProvider } from './context/SettingsContext';
import { ToastProvider } from './context/ToastContext';

import Sidebar from './components/layout/Sidebar';
import BottomNav from './components/layout/BottomNav';
import Header from './components/layout/Header';
import Toast from './components/common/Toast';

import DashboardScreen from './screens/DashboardScreen';
import TasksScreen from './screens/TasksScreen';
import TaskFormScreen from './screens/TaskFormScreen';
import SettingsScreen from './screens/SettingsScreen';

import './styles/variables.css';
import './styles/global.css';
import './styles/layout.css';
import './styles/layout-components.css';
import './styles/dashboard-tasks.css';
import './styles/forms.css';
import './styles/common.css';
import './styles/badges.css';
import './styles/settings.css';

/**
 * Main App component.
 * Handles global state providers and screen navigation.
 */
function App() {
  const [activeScreen, setActiveScreen] = useState(SCREENS.DASHBOARD);
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Helper to navigate to task form for editing
  const openEditTask = (id) => {
    setEditingTaskId(id);
    setActiveScreen(SCREENS.TASK_FORM);
  };

  const openAddTask = () => {
    setEditingTaskId(null);
    setActiveScreen(SCREENS.TASK_FORM);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case SCREENS.DASHBOARD:
        return <DashboardScreen onAddTask={openAddTask} />;
      case SCREENS.TASKS:
        return <TasksScreen onEditTask={openEditTask} onAddTask={openAddTask} />;
      case SCREENS.TASK_FORM:
        return <TaskFormScreen taskId={editingTaskId} onCancel={() => setActiveScreen(SCREENS.TASKS)} />;
      case SCREENS.SETTINGS:
        return <SettingsScreen />;
      default:
        return <DashboardScreen onAddTask={openAddTask} />;
    }
  };

  const getScreenTitle = () => {
    switch (activeScreen) {
      case SCREENS.DASHBOARD: return 'Dashboard';
      case SCREENS.TASKS: return 'My Tasks';
      case SCREENS.TASK_FORM: return editingTaskId ? 'Edit Task' : 'Add New Task';
      case SCREENS.SETTINGS: return 'Settings';
      default: return 'Student Task Manager';
    }
  };

  return (
    <SettingsProvider>
      <TaskProvider>
        <ToastProvider>
          <div className="app-container">
            <Sidebar activeScreen={activeScreen} onNavigate={setActiveScreen} />

            <main className="main-content">
              <Header title={getScreenTitle()} />

              <div className="screen-container">
                <Suspense fallback={<div className="loading">Loading...</div>}>
                  {renderScreen()}
                </Suspense>
              </div>

              <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
            </main>
            <Toast />
          </div>
        </ToastProvider>
      </TaskProvider>
    </SettingsProvider>
  );
}

export default App;
