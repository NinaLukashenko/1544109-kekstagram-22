import './util.js';
import './data.js';
// import './picture-list.js';
import './picture-modal.js';
import './upload-modal.js';
import './upload-form.js';
import { getData } from './api.js';
import { renderPicturesList } from './picture-list.js';
import { showAlert } from './message.js';

// Получение данных для отрисовки изображений-миниатюр
getData(
  (pictures) => renderPicturesList(pictures),
  (error) => showAlert(error),
);
