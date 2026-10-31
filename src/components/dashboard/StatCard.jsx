

/**
 * StatCard displays a single metric with an icon and label.
 * @param {Object} props
 * @param {string} props.label - The name of the statistic.
 * @param {string|number} props.value - The numerical value.
 * @param {string} props.icon - Emoji icon.
 * @param {string} props.color - CSS variable for the color.
 */
const StatCard = ({ label, value, icon, color }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ color: `var(${color})` }}>{icon}</div>
      <div className="stat-content">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
};

export default StatCard;
