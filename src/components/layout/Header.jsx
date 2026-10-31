

/**
 * Header component for the top of the screen.
 * @param {Object} props
 * @param {string} props.title - Title to display in the header.
 */
const Header = ({ title }) => {
  return (
    <header className="app-header">
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
