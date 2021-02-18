import { isEscEvent } from './util.js';
import { renderFullScreenPicture} from './picture-list.js';


const pictureListElement = document.querySelector('.pictures');
const pictureModalElement = document.querySelector('.big-picture');
const pictureModalCloseElement = document.querySelector('.big-picture__cancel');
const bodyElement = document.querySelector('body');
const commentCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');


// Вешаем обработчик события на блок с фотографиями по клику на какую-то из фотографий
pictureListElement.addEventListener('click', (evt) => {
  // клик
  if (evt.target.parentElement.classList.contains('picture')) {
    openPictureModal(evt.target.parentElement);
  // нажатие клавиши
  } else if (evt.target.classList.contains('picture')) {
    openPictureModal(evt.target);
  }
});

// Ф-я для ОТОБРАЖЕНИЯ МОДАЛЬНОЙ ФОРМЫ с полноэкранной фотографией
const openPictureModal = (element) => {
  renderFullScreenPicture(element.id);
  // Убираем класс, который скрывает модальную форму с полноэкранным фото
  pictureModalElement.classList.remove('hidden');

  // Прячим ненужные блоки:
  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  // Убираем скролл у body
  bodyElement.classList.add('modal-open');

  // Добавляем обработчик на клик на кн. модальной формы Крестик
  pictureModalCloseElement.addEventListener('click', closePictureModal);

  // Добавляем обработчик на нажатие клавиши Esc
  document.addEventListener('keydown', onPopupEscKeydown);
};

// Ф-я для СКРЫТИЯ МОДАЛЬНОЙ ФОРМЫ с полноэкранной фотографией
const closePictureModal = () => {
  pictureModalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
};

// Ф-я для обработчика события нажатия клавиши Esc при открытой модальной форме
const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};
