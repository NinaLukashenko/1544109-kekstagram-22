import { isEscEvent } from './util.js';

// Находим контрол загрузки фото
const pictureUploadElement = document.querySelector('#upload-file');
//  Находим форум редактирования фото
const pictureUploadModalElement = document.querySelector('.img-upload__overlay');
// Кнопка Крестик на форме
const pictureUploadModalCloseElement = document.querySelector('#upload-cancel');
// Элемент body
const bodyElement = document.querySelector('body');
// Масштаб
const scaleSmallerElement = document.querySelector('.scale__control--smaller');
const scaleBiggerElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const picturePreviewElement = document.querySelector('.img-upload__preview img');
const SCALE_DEFAULT_VALUE = 100;
const SCALE_STEP = 25;
const SCALE_MIN_VALUE = 25;
const SCALE_MAX_VALUE = 100;


// Ф-я для ОТОБРАЖЕНИЯ ФОРМЫ РЕДАКТИРОВАНИЯ ФОТО
const openPictureUploadModal = () => {
  scaleValueElement.value = SCALE_DEFAULT_VALUE;

  pictureUploadModalElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  pictureUploadModalCloseElement.addEventListener('click', closePictureUploadModal);
  document.addEventListener('keydown', onPopupEscKeydown);

  scaleSmallerElement.addEventListener('click', () => {
    changeScale('decrease');
  });
  scaleBiggerElement.addEventListener('click', () => {
    changeScale('increase');
  });
};

// Вешаем обработчик события на контрол загрузки фото
// pictureUploadElement.addEventListener('change', openPictureUploadModal);
pictureUploadElement.addEventListener('click', openPictureUploadModal)

// Ф-я для СКРЫТИЯ ФОРМЫ РЕДАКТИРОВАНИЯ ФОТО
const closePictureUploadModal = () => {
  // Сбрасываем значение поля выбора файла
  pictureUploadElement.files.FileList = [];

  pictureUploadModalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
};

// Ф-я для обработчика события нажатия клавиши Esc при открытой модальной форме
const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePictureUploadModal();
  }
};

const changeScale = (typeOfAction) => {
  const currenScaletValue = parseFloat(scaleValueElement.value);

  if (typeOfAction === 'increase' && currenScaletValue < SCALE_MAX_VALUE) {
    scaleValueElement.value = `${currenScaletValue + SCALE_STEP}%`;
    picturePreviewElement.style.transform = `scale(${(currenScaletValue + SCALE_STEP) / 100})`;
  } else if (typeOfAction === 'decrease' && currenScaletValue > SCALE_MIN_VALUE) {
    scaleValueElement.value = `${currenScaletValue - SCALE_STEP}%`;
    picturePreviewElement.style.transform = `scale(${(currenScaletValue - SCALE_STEP) / 100})`;
  }
};
