import { photoInfo } from './data.js';

// Находим блок для фотографий
const pictureListElement = document.querySelector('.pictures');

// Находим шаблон для отрисовки фотографий
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Формируем список фотографий
const pictures = photoInfo;

// Создаем "коробочку" для фотографий
// ибо вставлять все фотографии в DOM вместе (за один раз) оптимальней
const pictureListFragment = document.createDocumentFragment();

// Проходимся по списку фотографий и для каждой
// 1) копируем шаблон для отрисовки
// 2) подставляем соответствующие данные в скопированный шаблон
// 3) ложем фотографию в коробочку
pictures.forEach((item) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = item.url ;
  pictureElement.querySelector('.picture__likes').textContent = item.likes;
  pictureElement.querySelector('.picture__comments').textContent = item.comments.length;

  pictureListFragment.appendChild(pictureElement);
})

// Вставляем "коробочку" со всеми фотографиями в DOM
pictureListElement.appendChild(pictureListFragment);
