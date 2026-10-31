

/**
 * DatePickerField provides a labeled date input.
 * @param {Object} props
 * @param {string} props.label - Label for the input.
 * @param {string} props.value - Date value (YYYY-MM-DD).
 * @param {Function} props.onChange - Callback for change.
 * @param {boolean} props.required - Whether the field is required.
 * @param {string} props.error - Error message to display.
 */
const DatePickerField = ({ label, value, onChange, required, error }) => {
  return (
    <div className="form-field">
      <label className="field-label">
        {label} {required && <span className="required-asterisk">*</span>}
      </label>
      <input
        type="date"
        className={`field-input ${error ? 'error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default DatePickerField;
