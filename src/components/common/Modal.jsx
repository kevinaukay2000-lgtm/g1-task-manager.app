

/**
 * Modal component for confirmations and alerts.
 * @param {Object} props
 * @param {boolean} props.isOpen - Visibility.
 * @param {string} props.title - Modal header.
 * @param {React.ReactNode} props.children - Modal body.
 * @param {Function} props.onClose - Close handler.
 * @param {Function} props.onConfirm - Confirm handler.
 * @param {string} props.confirmLabel - Label for confirm button.
 * @param {string} props.cancelLabel - Label for cancel button.
 */
const Modal = ({ isOpen, title, children, onClose, onConfirm, confirmLabel = 'Confirm', cancelLabel = 'Cancel' }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button className="btn secondary" onClick={onClose}>{cancelLabel}</button>
          <button className="btn primary" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
