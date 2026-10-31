import { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { useToastNotifications } from '../../hooks/useToast';
import Button from '../common/Button';
import Modal from '../common/Modal';

/**
 * SubjectManager allows users to add, rename, and delete subjects.
 */
const SubjectManager = () => {
  const { subjects, addSubject, renameSubject, deleteSubject } = useTasks();
  const { success, warning } = useToastNotifications();
  const [newSubject, setNewSubject] = useState('');
  const [editingSubject, setEditingSubject] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  const handleAdd = () => {
    if (!newSubject.trim()) return;
    if (subjects.includes(newSubject.trim())) {
      warning('Subject already exists');
      return;
    }
    addSubject(newSubject.trim());
    setNewSubject('');
    success('Subject added');
  };

  const handleRename = () => {
    if (!editValue.trim() || editValue === editingSubject) {
      setEditingSubject(null);
      return;
    }
    if (subjects.includes(editValue.trim())) {
      warning('Subject already exists');
      return;
    }
    renameSubject(editingSubject, editValue.trim());
    setEditingSubject(null);
    success('Subject renamed');
  };

  return (
    <div className="subject-manager">
      <h3>Manage Subjects</h3>
      <div className="subject-add-row">
        <input
          type="text"
          className="field-input"
          placeholder="New subject..."
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>

      <ul className="subject-list">
        {subjects.map(subject => (
          <li key={subject} className="subject-item">
            {editingSubject === subject ? (
              <div className="subject-edit-mode">
                <input
                  type="text"
                  className="field-input"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  autoFocus
                />
                <div className="subject-edit-actions">
                  <Button variant="primary" onClick={handleRename}>Save</Button>
                  <Button variant="secondary" onClick={() => setEditingSubject(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="subject-view-mode">
                <span>{subject}</span>
                <div className="subject-actions">
                  <button className="btn-icon" onClick={() => { setEditingSubject(subject); setEditValue(subject); }}>✏️</button>
                  <button className="btn-icon" onClick={() => setSubjectToDelete(subject)}>🗑️</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <Modal
        isOpen={!!subjectToDelete}
        title="Delete Subject"
        onClose={() => setSubjectToDelete(null)}
        onConfirm={() => {
          deleteSubject(subjectToDelete);
          setSubjectToDelete(null);
          success('Subject deleted');
        }}
        confirmLabel="Delete"
      >
        Are you sure you want to delete <strong>{subjectToDelete}</strong>?
        Tasks associated with this subject will be moved to "Unassigned".
      </Modal>
    </div>
  );
};

export default SubjectManager;
