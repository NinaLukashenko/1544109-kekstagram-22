const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const picturePreview = document.querySelector('.img-upload__preview img');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => {
    return fileName.endsWith(item);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      picturePreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});
