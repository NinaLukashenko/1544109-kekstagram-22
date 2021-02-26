import { isEscEvent, hasDuplicate, ignoreCase } from './util.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_QUANTITY = 5;
const MAX_COMMENT_LENGTH = 140;

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagElement = uploadFormElement.querySelector('.text__hashtags');
const commentElement = uploadFormElement.querySelector('.text__description');

// ХЭШ-ТЕГИ
hashtagElement.addEventListener('input', () => {
  const hashtags = hashtagElement.value.split(' ');

  const hashtagsQuantity = hashtags.length;
  // Регулярное выражение взято из https://www.regexpal.com/95029
  const onlyLettersAndDigits = new RegExp('[^A-Za-z0-9]+');

  for (let i = 0; i < hashtagsQuantity; i++) {
    if (hashtags[i][0] !== '#' && hashtags[i] !== '') {
      hashtagElement.setCustomValidity('Каждый хэш-тег должен начинаться с символа #');
      break;
    // Проверяем наличие неверных символов (все кроме букв и цифр) начиная со второго символа ибо первый это решетка;
    } else if (onlyLettersAndDigits.test(hashtags[i].slice(1))) {
      hashtagElement.setCustomValidity('Строка каждого хэш-тега после решётки должна состоять из букв и чисел');
      break;
    } else if (hashtags[i].length === 1) {
      hashtagElement.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
      break;
    } else if (hashtags[i].length > MAX_HASHTAG_LENGTH) {
      hashtagElement.setCustomValidity(`Максимальная длина одного хэш-тега 20 символов. Удалите ${hashtags[i].length - MAX_HASHTAG_LENGTH} симв.`);
      break;
    } else if (hasDuplicate(ignoreCase(hashtags))) {
      hashtagElement.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      break;
    } else if (hashtagsQuantity > MAX_HASHTAG_QUANTITY) {
      hashtagElement.setCustomValidity('Нельзя указывать больше пяти хэш-тегов');
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

  if (valueLength > MAX_COMMENT_LENGTH) {
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
