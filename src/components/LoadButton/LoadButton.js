import { useLocation } from 'react-router-dom';
import './LoadButton.css';

function LoadButton(props) {
  const location = useLocation();
  const loadButtonClassName =
    location.pathname === '/movies'
      ? 'load-button'
      : 'load-button load-button_hidden';

  return (
    <div className="load-button__container">
      <button type="button" className={loadButtonClassName}>
        {props.loadButtonName}
      </button>
    </div>
  );
}

export default LoadButton;
