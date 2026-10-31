

/**
 * Button component for consistent styling.
 * @param {Object} props
 * @param {string} props.label - Button text.
 * @param {string} props.variant - 'primary' | 'secondary' | 'danger'.
 * @param {Function} props.onClick - Click handler.
 * @param {boolean} props.disabled - Disabled state.
 * @param {React.ReactNode} props.children - Children instead of label.
 */
const Button = ({ label, variant = 'primary', onClick, disabled, children }) => {
  const className = `btn ${variant}`;
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children || label}
    </button>
  );
};

export default Button;
