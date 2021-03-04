import { isEscEvent } from './util.js';

const ALERT_SHOW_TIME = 5000;
const POPUP_Z_INDEX = 100;

const mainElement = document.querySelector('main');

// Сообщение "ТРЕВОГА"
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = POPUP_Z_INDEX;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Сообщение "УСПЕХ"
const closeSuccessMessage = () => {
  const messageElement = mainElement.querySelector('.success');
  messageElement.remove();

  document.removeEventListener('keydown', onSuccessPopupEscKeydown);
};

const onSuccessPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const message = successMessageTemplate.cloneNode(true);
  mainElement.appendChild(message);

  const messageCloseButtonElement = message.querySelector('.success__button');
  const messageFormElement = message.querySelector('.success__inner');

  messageCloseButtonElement.addEventListener('click', () => {
    closeSuccessMessage();
  });

  document.addEventListener('click', (evt) => {
    if (evt.target !== messageFormElement) {
      closeSuccessMessage();
    }
  });

  document.addEventListener('keydown', onSuccessPopupEscKeydown);
};

// Сообщение "ОШИБКА"
const closeErrorMessage = () => {
  const messageElement = mainElement.querySelector('.error');
  messageElement.remove();

  document.removeEventListener('keydown', onErrorPopupEscKeydown);
};

const onErrorPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const showErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const message = errorMessageTemplate.cloneNode(true);
  message.style.zIndex = POPUP_Z_INDEX;
  mainElement.appendChild(message);

  const messageCloseButtonElement = message.querySelector('.error__button');
  const messageFormElement = message.querySelector('.error__inner');

  messageCloseButtonElement.addEventListener('click', () => {
    closeErrorMessage();
  });

  document.addEventListener('click', (evt) => {
    if (evt.target !== messageFormElement) {
      closeErrorMessage();
    }
  });

  document.addEventListener('keydown', onErrorPopupEscKeydown);
};


export { showAlert, showSuccessMessage, showErrorMessage };
