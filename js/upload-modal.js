import { isEscEvent } from './util.js';

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
const SCALE_DEFAULT_VALUE = 100;
const SCALE_STEP = 25;
const SCALE_MIN_VALUE = 25;
const SCALE_MAX_VALUE = 100;

// Наложение эффекта на изображение:
const effectListElement = document.querySelector('.effects__list');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');


// Ф-я для ОТОБРАЖЕНИЯ ФОРМЫ РЕДАКТИРОВАНИЯ ФОТО
const openPictureUploadModal = () => {
  scaleValueElement.value = SCALE_DEFAULT_VALUE;

  pictureUploadModalElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  pictureUploadModalCloseElement.addEventListener('click', closePictureUploadModal);
  document.addEventListener('keydown', onPopupEscKeydown);

  // Обработчик наж. кн. масштабирования Минус
  scaleSmallerElement.addEventListener('click', () => {
    // Считываем число без процентов
    const currenScaleValue = parseFloat(scaleValueElement.value);

    if (currenScaleValue > SCALE_MIN_VALUE) {
      scaleValueElement.value = `${currenScaleValue - SCALE_STEP}%`;
      picturePreviewElement.style.transform = `scale(${(currenScaleValue - SCALE_STEP) / 100})`;
    }

  });

  // Обработчик наж. кн. масштабирования Плюс
  scaleBiggerElement.addEventListener('click', () => {
    const currenScaletValue = parseFloat(scaleValueElement.value);

    if (currenScaletValue < SCALE_MAX_VALUE) {
      scaleValueElement.value = `${currenScaletValue + SCALE_STEP}%`;
      picturePreviewElement.style.transform = `scale(${(currenScaletValue + SCALE_STEP) / 100})`;
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
          createEffectLevelSlider(0, 1, 0.1, currentEffectValue);
          break;
        case 'sepia':
          createEffectLevelSlider(0, 1, 0.1, currentEffectValue);
          break;
        case 'marvin':
          createEffectLevelSlider(0, 100, 1, currentEffectValue);
          break;
        case 'phobos':
          createEffectLevelSlider(0, 3, 0.1, currentEffectValue);
          break;
        case 'heat':
          createEffectLevelSlider(1, 3, 0.1, currentEffectValue);
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
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
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
