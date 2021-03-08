import { renderPicturesList } from './picture-list.js';
import { randomNumber, clearDuplicate } from './util.js';

const RANDOM_PICTURES_QUANTITY = 10;
const FIRST_PICTURES_INDEX = 0;
const LAST_PICTURES_INDEX = 24;

const imageFilterElement = document.querySelector('.img-filters');
const imageFilterFormElement = document.querySelector('.img-filters__form');
const imageFilters = imageFilterFormElement.querySelectorAll('.img-filters__button');

const showImageFilter = () => {
  imageFilterElement.classList.remove('img-filters--inactive');
};

// Обработчик клика по опциям ФИЛЬТРА
const setImageFilterClick = (callback) => {
  imageFilterFormElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      imageFilters.forEach((item) => {
        // Переключаем класс активного фильтра
        if (item.id !== evt.target.id) {
          item.classList.remove('img-filters__button--active');
        } else {
          item.classList.add('img-filters__button--active');
        }
      })
      callback(evt.target.id);
    }
  });
};

// Фильтрация фотографий
const filterPicturesList = (pictures, filterType) => {
  switch(filterType) {
    case 'filter-random':
      renderPicturesList(getRandomPictures(pictures));
      break;
    case 'filter-discussed':
      renderPicturesList(pictures.slice().sort(sortPicturesByDiscussion));
      break;
    default:
      renderPicturesList(pictures);
  }
};

// Функция сортировки фотографий по обсуждаемости (количеству комментариев)
const sortPicturesByDiscussion = (pictureA, pictureB) => {
  const discussionRankA = pictureA.comments.length;
  const discussionRankB = pictureB.comments.length;

  return discussionRankB - discussionRankA;
};

// Функция для получения случайных фотографий
const getRandomPictures = (pictures) => {
  let randomPictures = [];

  let i = 0;
  do {
    randomPictures.push(pictures[randomNumber(FIRST_PICTURES_INDEX, LAST_PICTURES_INDEX)]);
    randomPictures = clearDuplicate(randomPictures, 'id');
    i = randomPictures.length;
  } while (i < RANDOM_PICTURES_QUANTITY);

  return randomPictures;
};

export { showImageFilter, setImageFilterClick, filterPicturesList };
