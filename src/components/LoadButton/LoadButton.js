import './LoadButton.css';

function LoadButton(props) {
  const loadButtonClassName = props.isButtonVisible
    ? 'load-button'
    : 'load-button load-button_hidden';

  return (
    <div className="load-button__container">
      <button type="button" className={loadButtonClassName} onClick={props.onShowMoreButton}>
        Ещё
      </button>
    </div>
  );
}

export default LoadButton;
