import './button.css';
const Button = ({ children = 'Click Me', onClick, className = '' }) => {
  return (
    <div>
      <button className={`primary-button ${className}`} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
