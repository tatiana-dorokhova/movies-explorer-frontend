import { useEffect, useState } from 'react';
import './LoadButton.css';

function LoadButton(props) {
  const [startItemsCount, setStartItemsCount] = useState(0);
  const [itemsToShowCount, setItemsToShowCount] = useState(0);
  const [isShowMoreButtonActive, setIsShowMoreButtonActive] = useState(true);

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

  // если количество найденных карточек меньше startItemsCount,
  // то кнопку Еще скрыть
  useEffect(() => {
    if (props.startMoviesCardCount <= startItemsCount) {
      setIsShowMoreButtonActive(false);
    } else setIsShowMoreButtonActive(true);
  }, [props.startMoviesCardCount]);

  console.log('props.startMoviesCardCount = ', props.startMoviesCardCount);
  console.log('startItemsCount = ', startItemsCount);
  console.log('isShowMoreButtonActive = ', isShowMoreButtonActive);

  // коллекция всех карточек с фильмами
  const moviesList = Array.from(document.querySelectorAll('.movies-card'));

  console.log('коллекция всех карточек с фильмами moviesList = ', moviesList);

  // если количество найденных карточек > startItemsCount,
  // то карточкам добавить класс hidden
  if (moviesList.length > startItemsCount) {
    const invisibleItems = moviesList.slice(startItemsCount);
    console.log('invisibleItems = ', invisibleItems);
    invisibleItems.forEach((element) => {
      element.classList.add('movies-card_hidden');
    });
  }

  // начальное видимое количество карточек
  let items = startItemsCount;
  console.log('количество видимых карточек items = ', items);

  const handleShowMoreButton = () => {
    items += itemsToShowCount;
    // массив видимых элементов после нажатия на кнопку
    const visibleItems = moviesList.slice(0, items);
    console.log('массив видимых элементов после нажатия на кнопку visibleItems = ', visibleItems);

    visibleItems.forEach((element) => {
      element.classList.remove('movies-card_hidden');
    });

    if (visibleItems.length === moviesList.length) {
      setIsShowMoreButtonActive(false);
    }
  };

  const loadButtonClassName = isShowMoreButtonActive
    ? 'load-button'
    : 'load-button load-button_hidden';

  return (
    <div className="load-button__container">
      <button type="button" className={loadButtonClassName} onClick={handleShowMoreButton}>
        Ещё
      </button>
    </div>
  );
}

export default LoadButton;
