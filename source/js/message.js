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
  document.removeEventListener('click', onSuccessModalClickOut);
};

const onSuccessPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

const onSuccessModalClickOut = (evt) => {
  const messageFormElement = document.querySelector('.success__inner');
  if (evt.target === messageFormElement) {
    evt.stopPropagation();
  } else {
    closeSuccessMessage();
  }
}

const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const message = successMessageTemplate.cloneNode(true);
  mainElement.appendChild(message);

  const messageCloseButtonElement = message.querySelector('.success__button');

  messageCloseButtonElement.addEventListener('click', () => {
    closeSuccessMessage();
  });

  document.addEventListener('keydown', onSuccessPopupEscKeydown);
  document.addEventListener('click', onSuccessModalClickOut);
};

// Сообщение "ОШИБКА"
const closeErrorMessage = () => {
  const messageElement = mainElement.querySelector('.error');
  messageElement.remove();

  document.removeEventListener('keydown', onErrorPopupEscKeydown);
  document.removeEventListener('click', onErrorModalClickOut);
};

const onErrorPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const onErrorModalClickOut = (evt) => {
  const messageFormElement = document.querySelector('.error__inner');
  if (evt.target === messageFormElement) {
    evt.stopPropagation();
  } else {
    closeErrorMessage();
  }
}

const showErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const message = errorMessageTemplate.cloneNode(true);
  message.style.zIndex = POPUP_Z_INDEX;
  mainElement.appendChild(message);

  const messageCloseButtonElement = message.querySelector('.error__button');

  messageCloseButtonElement.addEventListener('click', () => {
    closeErrorMessage();
  });

  document.addEventListener('keydown', onErrorPopupEscKeydown);
  document.addEventListener('click', onErrorModalClickOut);
};


export { showAlert, showSuccessMessage, showErrorMessage };
