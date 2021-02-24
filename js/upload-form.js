import { isEscEvent } from './util.js';

const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 104;
const MAX_COMMENT_LENGTH = 140;

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagElement = uploadFormElement.querySelector('.text__hashtags');
const commentElement = uploadFormElement.querySelector('.text__description');

// ХЭШ-ТЕГИ
hashtagElement.addEventListener('input', () => {
  const hashtags = hashtagElement.value.split(' ');

  const max = hashtags.length;
  // Регулярное выражение взято из https://www.regexpal.com/95029
  const onlyLettersAndDigits = new RegExp('[^A-Za-z0-9]+');

  for (let i = 0; i < max; i++) {
    if (hashtags[i][0] !== '#' && hashtags[i] !== '') {
      hashtagElement.setCustomValidity('Каждый хэш-тег должен начинаться с символа #');
      break;
    // Проверяем наличие неверных символов (все кроме букв и цифр) начиная со второго символа ибо первый это решетка;
    } else if (onlyLettersAndDigits.test(hashtagElement.value.slice(1))) {
      hashtagElement.setCustomValidity('Строка после решётки должна состоять из букв и чисел');
      break;
    } else {
      // Валидация ок - сбрасываем ошибку
      hashtagElement.setCustomValidity('');
    }
  }

  // Говорим браузеру, что нужно проверять валидность поля на каждый ввод символа, а не аж при отправке формы
  hashtagElement.reportValidity();

});

// Прерываем продвижения события дальше чтобы нажатие клавиши Esc не закрыло модальную форму
hashtagElement.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

// КОММЕНТАРИЙ
commentElement.addEventListener('input', () => {
  const valueLength = commentElement.value.length;

  if (valueLength > 140) {
    commentElement.setCustomValidity(`Удалите лишние ${valueLength - MAX_COMMENT_LENGTH} симв.`);
  } else {
    // Валидация ок - сбрасываем ошибку
    commentElement.setCustomValidity('');
  }

  // Говорим браузеру, что нужно проверять валидность поля на каждый ввод символа
  commentElement.reportValidity();
});

// Прерываем продвижения события дальше чтобы нажатие клавиши Esc не закрыло модальную форму
commentElement.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});
