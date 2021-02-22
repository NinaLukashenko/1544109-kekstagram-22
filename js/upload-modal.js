import { isEscEvent } from './util.js';

const SCALE_DEFAULT = 100;
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const GRAYSCALE_MIN = 0;
const GRAYSCALE_MAX = 1;
const GRAYSCALE_STEP = 0.1;
const SEPIA_MIN = 0;
const SEPIA_MAX = 1;
const SEPIA_STEP = 0.1;
const INVERT_MIN = 0;
const INVERT_MAX = 100;
const INVERT_STEP = 1;
const BLUR_MIN = 0;
const BLUR_MAX = 3;
const BLUR_STEP = 0.1;
const BRIGHTNESS_MIN = 1;
const BRIGHTNESS_MAX = 3;
const BRIGHTNESS_STEP = 0.1;

// Находим контрол загрузки фото
const pictureUploadElement = document.querySelector('#upload-file');
//  Находим форум редактирования фото
const pictureUploadModalElement = document.querySelector('.img-upload__overlay');
// Кнопка Крестик на форме
const pictureUploadModalCloseElement = document.querySelector('#upload-cancel');
// Элемент body
const bodyElement = document.querySelector('body');

// Масштаб:
const scaleSmallerElement = document.querySelector('.scale__control--smaller');
const scaleBiggerElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const picturePreviewElement = document.querySelector('.img-upload__preview img');

// Наложение эффекта на изображение:
const effectListElement = document.querySelector('.effects__list');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');


// Ф-я для ОТОБРАЖЕНИЯ ФОРМЫ РЕДАКТИРОВАНИЯ ФОТО
const openPictureUploadModal = () => {
  let currenScaleValue = SCALE_DEFAULT;
  scaleValueElement.value = `${currenScaleValue}%`;

  pictureUploadModalElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  pictureUploadModalCloseElement.addEventListener('click', closePictureUploadModal);
  document.addEventListener('keydown', onPopupEscKeydown);

  // Обработчик наж. кн. масштабирования Минус
  scaleSmallerElement.addEventListener('click', () => {
    if (currenScaleValue > SCALE_MIN) {
      currenScaleValue -= SCALE_STEP;
      scaleValueElement.value = `${currenScaleValue}%`;
      picturePreviewElement.style.transform = `scale(${currenScaleValue / 100})`;
    }
  });

  // Обработчик наж. кн. масштабирования Плюс
  scaleBiggerElement.addEventListener('click', () => {
    if (currenScaleValue < SCALE_MAX) {
      currenScaleValue += SCALE_STEP;
      scaleValueElement.value = `${currenScaleValue}%`;
      picturePreviewElement.style.transform = `scale(${currenScaleValue / 100})`;
    }
  });

  // Обработчик выбора эффекта
  effectListElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('effects__radio')) {
      const currentEffectValue = evt.target.value;

      picturePreviewElement.className = `effects__preview--${currentEffectValue}`;

      if (effectLevelSliderElement.noUiSlider) {
        effectLevelSliderElement.noUiSlider.destroy();
      }
      effectLevelValueElement.value = '';

      switch(currentEffectValue) {
        case 'none':
          picturePreviewElement.style.filter = '';
          break;
        case 'chrome':
          createEffectLevelSlider(GRAYSCALE_MIN, GRAYSCALE_MAX, GRAYSCALE_STEP, currentEffectValue);
          break;
        case 'sepia':
          createEffectLevelSlider(SEPIA_MIN, SEPIA_MAX, SEPIA_STEP, currentEffectValue);
          break;
        case 'marvin':
          createEffectLevelSlider(INVERT_MIN, INVERT_MAX, INVERT_STEP, currentEffectValue);
          break;
        case 'phobos':
          createEffectLevelSlider(BLUR_MIN, BLUR_MAX, BLUR_STEP, currentEffectValue);
          break;
        case 'heat':
          createEffectLevelSlider(BRIGHTNESS_MIN, BRIGHTNESS_MAX, BRIGHTNESS_STEP, currentEffectValue);
          break;
      }
    }
  })
};

// Вешаем обработчик события на контрол загрузки фото
pictureUploadElement.addEventListener('change', openPictureUploadModal);

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

// Ф-я СОЗДАНИЯ СЛАЙДЕРА
const createEffectLevelSlider = (min, max, step, currentEffectValue) => {
  // eslint-disable-next-line no-undef
  noUiSlider.create(effectLevelSliderElement, {
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => {
        return parseFloat(value);
      },
    },
  });

  // Обработчик события Апдейт на сладере
  effectLevelSliderElement.noUiSlider.on('update', (values, handle) => {
    effectLevelValueElement.value = values[handle];

    switch(currentEffectValue) {
      case 'chrome':
        picturePreviewElement.style.filter = `grayscale(${values[handle]})`;
        break;
      case 'sepia':
        picturePreviewElement.style.filter = `sepia(${values[handle]})`;
        break;
      case 'marvin':
        picturePreviewElement.style.filter = `invert(${values[handle]}%)`;
        break;
      case 'phobos':
        picturePreviewElement.style.filter = `blur(${values[handle]}px)`;
        break;
      case 'heat':
        picturePreviewElement.style.filter = `brightness(${values[handle]})`;
        break;
    }
  });
};
