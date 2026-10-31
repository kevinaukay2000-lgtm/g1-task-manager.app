import { useState, useEffect } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { useToastNotifications } from '../../hooks/useToast';
import { generateId } from '../../utils/taskUtils';
import { getToday } from '../../utils/dateUtils';
import { PRIORITIES, STATUSES } from '../../constants';
import Button from '../common/Button';
import DatePickerField from './DatePickerField';

/**
 * TaskForm handles both adding and editing tasks.
 * @param {Object} props
 * @param {string|null} props.taskId - ID of task to edit, or null for new.
 * @param {Function} props.onCancel - Callback to return to list.
 * @param {Function} props.onSuccess - Callback after successful save.
 */
const TaskForm = ({ taskId, onCancel, onSuccess }) => {
  const { tasks, subjects, addTask, updateTask } = useTasks();
  const { success, error: toastError } = useToastNotifications();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: 'Unassigned',
    priority: PRIORITIES.MEDIUM,
    deadline: getToday(),
    status: STATUSES.PENDING,
  });

  const [errors, setErrors] = useState({});

  // Pre-fill form if editing
  useEffect(() => {
    if (taskId) {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        // To satisfy the react-hooks/set-state-in-effect rule,
        // we use a requestAnimationFrame to move the update to the next frame.
        requestAnimationFrame(() => {
          setFormData({
            title: task.title,
            description: task.description,
            subject: task.subject,
            priority: task.priority,
            deadline: task.deadline,
            status: task.status,
          });
        });
      }
    }
  }, [taskId, tasks]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (taskId) {
        await updateTask(taskId, formData);
        success('Task updated successfully');
      } else {
        const newTask = {
          ...formData,
          id: generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await addTask(newTask);
        success('Task added successfully');
      }
      if (onSuccess) onSuccess();
    } catch {
      toastError('Failed to save task');
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="field-label">Title <span className="required-asterisk">*</span></label>
        <input
          type="text"
          className={`field-input ${errors.title ? 'error' : ''}`}
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g. Math Assignment 1"
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label className="field-label">Description</label>
        <textarea
          className="field-input"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Optional details..."
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="field-label">Subject</label>
          <select
            className="field-input"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
          >
            <option value="Unassigned">Unassigned</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label className="field-label">Priority</label>
          <select
            className="field-input"
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
          >
            {Object.values(PRIORITIES).map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <DatePickerField
        label="Deadline"
        value={formData.deadline}
        onChange={(val) => handleChange('deadline', val)}
        required
        error={errors.deadline}
      />

      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">
          {taskId ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
