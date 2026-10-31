

/**
 * ProgressBar displays a percentage fill.
 * @param {Object} props
 * @param {number} props.progress - Percentage (0-100).
 * @param {string} props.label - Label for the bar.
 */
const ProgressBar = ({ progress, label }) => {
  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="progress-label">{label}</span>
        <span className="progress-value">{progress}%</span>
      </div>
      <div className="progress-bar-bg">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
