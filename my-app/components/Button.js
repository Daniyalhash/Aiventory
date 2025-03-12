// components/Button.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../src/styles/button.css';

const Button = ({ text, icon, onClick, disabled = false }) => {
  return (
    <button
      className={`customButton ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {icon && <FontAwesomeIcon icon={icon} className="buttonIcon" />}
      {text}
    </button>
  );
};

export default Button;
