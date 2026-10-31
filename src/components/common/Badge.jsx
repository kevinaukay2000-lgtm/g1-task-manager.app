

/**
 * Badge component for priority and status.
 * @param {Object} props
 * @param {string} props.type - 'low' | 'medium' | 'high' | 'pending' | 'completed'.
 * @param {React.ReactNode} props.children - Label text.
 */
const Badge = ({ type, children }) => {
  return (
    <span className={`badge badge-${type}`}>
      {children}
    </span>
  );
};

export default Badge;
