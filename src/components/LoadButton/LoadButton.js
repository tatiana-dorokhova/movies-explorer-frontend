import { useLocation } from 'react-router-dom';
import './LoadButton.css';

function LoadButton(props) {
  const showMore = document.querySelector('.load-button');
  // коллекция всех карточек с фильмами
  const moviesList = document.querySelectorAll('.movies-card');

  console.log('селектор кнопки showMore = ', showMore);
  console.log('коллекция всех карточек с фильмами moviesList = ', moviesList);

  // начальное видимое количество карточек
  let items = moviesList.length < 12 ? moviesList.length : 12;
  console.log('начальное видимое количество карточек items = ', items);

  const handleShowMoreButton = () => {
    items += 3;
    const arrayOfItems = Array.from(moviesList);
    // массив видимых элементов после нажатия на кнопку
    const visibleItems = arrayOfItems.slice(0, items);
    console.log('массив видимых элементов после нажатия на кнопку visibleItems = ', visibleItems);

    visibleItems.forEach((element) => {
      element.classList.add('movies-card_visible');
    });

    if (visibleItems.length === moviesList.length) {
      showMore.style.display = 'none';
    }
  };

  const location = useLocation();
  const loadButtonClassName =
    location.pathname === '/movies' ? 'load-button' : 'load-button load-button_hidden';

  return (
    <div className="load-button__container">
      <button type="button" className={loadButtonClassName} onClick={handleShowMoreButton}>
        {props.loadButtonName}
      </button>
    </div>
  );
}

export default LoadButton;
