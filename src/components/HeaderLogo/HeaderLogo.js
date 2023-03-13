import './HeaderLogo.css';
import { Link } from 'react-router-dom';

function HeaderLogo(props) {
  return (
    <Link to="/" className="header__logo">
      <img src={props.logoSrc} alt={props.logoAlt} />
    </Link>
  );
}

export default HeaderLogo;
