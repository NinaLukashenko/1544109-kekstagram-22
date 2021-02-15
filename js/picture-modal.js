// Находим блок с фотографиями
const pictureListElement = document.querySelector('.pictures');
const pictureModalElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const pictureModalCloseElement = document.querySelector('.big-picture__cancel');

// Ф-я для обработчика события 'клик' на фотографии
const showPictureModalElement = function (evt) {
  if (evt.target.classList.contains('picture__img')) {
    // console.dir(evt.target);
    pictureModalElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
  }
}

// Вешаем обработчик события на блок с фотографиями
pictureListElement.addEventListener('click', showPictureModalElement);

// Ф-я для обработчика события 'клик' на крестике - кн. Закрыть на модальной форме с полноэкранным фото
const closePictureModalElement = function(evt) {
  pictureModalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
}

pictureModalCloseElement.addEventListener('click', closePictureModalElement);

// TODO: обработчики для клавиатуры
// Подставлять необходимые значения (предварительно добавить айдишки к фоткам)
