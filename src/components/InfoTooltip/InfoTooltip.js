import './InfoTooltip.css';

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container section">
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <img
          src={props.isActionSuccess ? props.okImage : props.failImage}
          alt={props.name}
          className="popup__notification-image"
        />
        <p className="popup__notification">
          {props.isActionSuccess ? props.successMessage : props.failMessage}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
