// компонент страницы 404
import './PageNotFound.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h3 className="not-found__title">404</h3>
      <p className="not-found__text">Страница не найдена</p>
      <button
        type="button"
        className="not-found__button"
        onClick={() => navigate(-1)}
      >
        Назад
      </button>
    </div>
  );
}

export default PageNotFound;
