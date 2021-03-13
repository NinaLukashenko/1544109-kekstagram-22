/* global _:readonly */

import './util.js';
import './data.js';
import './picture-modal.js';
import './upload-modal.js';
import './upload-form.js';
import { getData } from './api.js';
import { renderPicturesList } from './picture-list.js';
import { showImageFilter, setImageFilterClick, filterPicturesList } from './picture-filter.js';
import { showAlert, showSuccessMessage } from './message.js';
import { closePictureUploadModal } from './upload-modal.js';
import { setUploadFormSubmit } from './upload-form.js';

const RERENDER_DELAY = 500;

let photos = [];

// Получение данных для отрисовки изображений-миниатюр
getData(
  (pictures) => {
    photos  = pictures;
    renderPicturesList(pictures);
    showImageFilter();
    setImageFilterClick(_.debounce(
      (filterType) => filterPicturesList(pictures, filterType),
      RERENDER_DELAY,
    ));
  },
  (error) => showAlert(error),
);

// Отправка формы загрузки файла
setUploadFormSubmit(() => {
  showSuccessMessage();
  closePictureUploadModal();
});

export { photos };
