import { photos } from './main.js';

const COMMENT_SET = 5;

// Находим блок для фотографий
const pictureListElement = document.querySelector('.pictures');
// Находим шаблон для отрисовки фотографий
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
// Форма отображения полноэкранной фотографии
const modalPicturePreview = document.querySelector('.big-picture__preview');
// Находим шаблон для отрисовки комментариев
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
// Находим блок комментариев
const commentListElement = document.querySelector('.social__comments');
// Кнопка "Загрузить еще"
const commentsLoaderElement = document.querySelector('.comments-loader');
// Айдишка текущей (открытой в полноэкранном режиме) фотки
let fullScreenPictureId = null;

// РИСУЕМ ИЗОБРАЖЕНИЯ-МИНИАТЮРЫ НА ГЛАВНОЙ СТРАНИЦЕ
const renderPicturesList = (pictures) => {
  // Создаем "коробочку" для фотографий
  // ибо вставлять все фотографии в DOM вместе (за один раз) оптимальней
  const pictureListFragment = document.createDocumentFragment();

  // Проходимся по списку фотографий и для каждой
  // 1) копируем шаблон для отрисовки
  // 2) подставляем соответствующие данные в скопированный шаблон
  // 3) кладем фотографию в коробочку
  pictures.forEach((item) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.id = item.id ;
    pictureElement.querySelector('.picture__img').src = item.url ;
    pictureElement.querySelector('.picture__likes').textContent = item.likes;
    pictureElement.querySelector('.picture__comments').textContent = item.comments.length;

    pictureListFragment.appendChild(pictureElement);
  });

  // Очищаем блок с предыдущими фотографиями
  Array.from(pictureListElement.children).forEach((item) => {
    if (item.classList.contains('picture')) {
      item.remove();
    }
  });

  // Вставляем "коробочку" со всеми фотографиями в DOM
  pictureListElement.appendChild(pictureListFragment);
};


// РИСУЕМ ОДНУ ПОЛНОЭКРАННУЮ ФОТОГРАФИЮ
const renderFullScreenPicture = (id) => {
  const currentPicture = photos.find(item => item.id === +id);
  fullScreenPictureId = currentPicture.id;

  modalPicturePreview.querySelector('.big-picture__img img').src = currentPicture.url;
  modalPicturePreview.querySelector('.likes-count').textContent = currentPicture.likes;
  modalPicturePreview.querySelector('.social__caption').textContent = currentPicture.description;
  modalPicturePreview.querySelector('.comments-count').textContent = currentPicture.comments.length;
  clearComments();
  showComments();
};

// ОТОБРАЖАЕМ БЛОК С КОММЕНТАРИЯМИ
const showComments = () => {
  // Отображаем кнопку "Загрузить больше комментариев"
  commentsLoaderElement.classList.remove('hidden');

  renderComments();

  commentsLoaderElement.addEventListener('click', renderComments);
};

// РИСУЕМ КОММЕНТАРИИ
const renderComments = () => {
  // Создаем "коробочку"
  const commentListFragment = document.createDocumentFragment();

  const currentPictureIndex = photos.findIndex(item => item.id === fullScreenPictureId);
  // Проходимся по списку комментариев
  const commentsQuantity = commentListElement.children.length;
  photos[currentPictureIndex].comments.slice(commentsQuantity, (commentsQuantity + COMMENT_SET)).forEach((item) => {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = item.avatar ;
    commentElement.querySelector('.social__picture').alt = item.name;
    commentElement.querySelector('.social__text').textContent = item.message;

    commentListFragment.appendChild(commentElement);
  });

  // Вставляем "коробочку" в DOM
  commentListElement.appendChild(commentListFragment);

  const showedCommentsQuantity = commentListElement.children.length;
  modalPicturePreview.querySelector('.social__comment-count').childNodes[0].textContent = `${showedCommentsQuantity} из `;

  // Прячем кнопку "Загрузить больше комментариев", если уже все отображены
  if (showedCommentsQuantity === photos[currentPictureIndex].comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

// ОЧИЩАЕМ ПРЕДЫДУЩИЕ КОММЕНТАРИИ
const clearComments = () => {
  const comments = commentListElement.children;
  // Свойство children возвращает живую коллекцию, преобразуем ее в стаитичный массив
  // Удаляем комментарии к предыдущему фото
  Array.from(comments).forEach((item) => {
    item.remove();
  });
};

export { renderPicturesList, renderFullScreenPicture };
