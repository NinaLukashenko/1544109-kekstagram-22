import './util.js';
import './data.js';
import './picture-modal.js';
import './upload-modal.js';
import './upload-form.js';
import { getData } from './api.js';
import { renderPicturesList } from './picture-list.js';
import { showAlert } from './message.js';
import { closePictureUploadModal } from './upload-modal.js';
import { setUploadFormSubmit } from './upload-form.js';

// Получение данных для отрисовки изображений-миниатюр
getData(
  (pictures) => renderPicturesList(pictures),
  (error) => showAlert(error),
);

// Отправка формы загрузки файла
setUploadFormSubmit(closePictureUploadModal);
