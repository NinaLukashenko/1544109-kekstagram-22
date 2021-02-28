const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  const {status, statusText} = response;
  throw new Error(`${status} - ${statusText}`);
}

const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then(checkStatus)
    .then((response) => response.json())
    .then((pictures) => onSuccess(pictures))
    .catch((error) => onFail(error));
};

export { getData };
