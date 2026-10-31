import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useSettings } from '../hooks/useSettings';
import { useToastNotifications } from '../hooks/useToast';
import SubjectManager from '../components/subjects/SubjectManager';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';

/**
 * SettingsScreen provides access to theme, accent color, data management, and About.
 */
const SettingsScreen = () => {
  const { theme, setTheme, accentColor, setAccentColor } = useSettings();
  const { clearCompletedTasks, resetAllData } = useTasks();
  const { success, warning } = useToastNotifications();
  const [showResetModal, setShowResetModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  return (
    <div className="settings-container">
      <section className="settings-section">
        <h3>Appearance</h3>
        <div className="settings-group">
          <label>Theme</label>
          <div className="theme-options">
            {['light', 'dark', 'system'].map(t => (
              <button
                key={t}
                className={`theme-btn ${theme === t ? 'active' : ''}`}
                onClick={() => setTheme(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-group">
          <label>Accent Color</label>
          <div className="accent-options">
            {['#007bff', '#6610f2', '#6f42c1', '#e83e8c', '#fd7e14', '#20c997', '#28a745'].map(color => (
              <button
                key={color}
                className={`accent-btn ${accentColor === color ? 'active' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setAccentColor(color)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h3>Organization</h3>
        <SubjectManager />
      </section>

      <section className="settings-section">
        <h3>Data Management</h3>
        <div className="data-actions">
          <Button variant="secondary" onClick={() => setShowClearModal(true)}>
            Clear Completed Tasks
          </Button>
          <Button variant="danger" onClick={() => setShowResetModal(true)}>
            Reset All Data
          </Button>
        </div>
      </section>

      <footer className="settings-about">
        <p><strong>Student Task Manager</strong></p>
        <p>Version 1.0.0</p>
        <p>A production-ready tool for managing academic deadlines.</p>
      </footer>

      <Modal
        isOpen={showClearModal}
        title="Clear Completed"
        onClose={() => setShowClearModal(false)}
        onConfirm={() => {
          clearCompletedTasks();
          setShowClearModal(false);
          success('Completed tasks cleared');
        }}
      >
        This will permanently remove all tasks marked as completed.
      </Modal>

      <Modal
        isOpen={showResetModal}
        title="Reset All Data"
        onClose={() => setShowResetModal(false)}
        onConfirm={() => {
          resetAllData();
          setShowResetModal(false);
          warning('All data has been reset');
        }}
        confirmLabel="Reset Everything"
      >
        This action cannot be undone. All tasks and custom subjects will be deleted.
      </Modal>
    </div>
  );
};

export default SettingsScreen;
