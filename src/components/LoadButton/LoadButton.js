import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './LoadButton.css';

function LoadButton(props) {
  const [startItemsCount, setStartItemsCount] = useState(0);
  const [itemsToShowCount, setItemsToShowCount] = useState(0);

  useEffect(() => {
    // вычислить текущую ширину и установить значения в зависимости от нее
    function calcWidth() {
      if (window.innerWidth >= 1280) {
        setStartItemsCount(12);
        setItemsToShowCount(3);
      } else if (window.innerWidth >= 636) {
        setStartItemsCount(8);
        setItemsToShowCount(2);
      } else {
        setStartItemsCount(5);
        setItemsToShowCount(2);
      }
    }
    // повесить листнер на изменение ширины экрана при монтировании компонента
    window.addEventListener('resize', calcWidth());
  }, []);

  const showMore = document.querySelector('.load-button');
  // коллекция всех карточек с фильмами
  const moviesList = document.querySelectorAll('.movies-card');

  console.log('селектор кнопки showMore = ', showMore);
  console.log('коллекция всех карточек с фильмами moviesList = ', moviesList);

  // начальное видимое количество карточек
  let items = moviesList.length < startItemsCount ? moviesList.length : startItemsCount;
  console.log('начальное видимое количество карточек items = ', items);

  const handleShowMoreButton = () => {
    items += itemsToShowCount;
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
