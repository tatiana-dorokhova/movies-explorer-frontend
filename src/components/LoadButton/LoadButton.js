import './LoadButton.css';

function LoadButton(props) {
  return (
    <div className="load-button__container">
      <button type="button" className="load-button">
        {props.loadButtonName}
      </button>
    </div>
  );
}

export default LoadButton;
