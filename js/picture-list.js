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

  pictureElement.id = item.id ;
  pictureElement.querySelector('.picture__img').src = item.url ;
  pictureElement.querySelector('.picture__likes').textContent = item.likes;
  pictureElement.querySelector('.picture__comments').textContent = item.comments.length;

  pictureListFragment.appendChild(pictureElement);
})

// Вставляем "коробочку" со всеми фотографиями в DOM
pictureListElement.appendChild(pictureListFragment);


// РИСУЕМ ОДНУ ПОЛНОЭКРАННУЮ ФОТОГРАФИЮ
const renderFullScreenPicture = (id) => {
  let currentPicture = photoInfo.find(item => item.id === +id);

  const modalPicturePreview = document.querySelector('.big-picture__preview');
  modalPicturePreview.querySelector('.big-picture__img img').src = currentPicture.url;
  modalPicturePreview.querySelector('.likes-count').textContent = currentPicture.likes;
  modalPicturePreview.querySelector('.comments-count').textContent = currentPicture.comments.length;
  modalPicturePreview.querySelector('.social__caption').textContent = currentPicture.description;
  renderComments(currentPicture);
}

const renderComments = (picture) => {
  // Находим шаблон для отрисовки комментариев
  const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  // Создаем "коробочку"
  const commentListFragment = document.createDocumentFragment();
  // Проходимся по списку комментариев
  picture.comments.forEach((item) => {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = item.avatar ;
    commentElement.querySelector('.social__picture').alt = item.name;
    commentElement.querySelector('.social__text').textContent = item.message;

    commentListFragment.appendChild(commentElement);
  })

  // Находим старый блок комментариев
  const commentListElement = document.querySelector('.social__comments');
  const comments = commentListElement.children;

  // Свойство children возвращает живую коллекцию, преобразуем ее в стаитичный массив
  // Удаляем комментарии к предыдущему фото
  Array.from(comments).forEach((item) => {
    item.remove();
  });

  // Вставляем "коробочку" в DOM
  commentListElement.appendChild(commentListFragment);
}

export { renderFullScreenPicture };
