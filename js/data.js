import { randomNumber } from './util.js';

const DESCRIPTIONS = [
  'Отдыхаем!',
  'Наконец-то отпуск!',
  'Какой прекрасный день!',
  'Мой лучший друг...',
  'С Днем Рождения!',
  'Уххууу!',
  'Мое любимое фото:)',
  'Друзья',
  'Так я отдыхаю))',
  'С понедельником всех!',
  'Мой любимый день недели',
  'Зе бест фото еве(р)',
  'Мысли вслух',
  'Что такое радость?...',
  'Подводим итоги месяца',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Сергей',
  'Андрей',
  'Артем',
  'Денис',
  'Влад',
  'Ника',
  'Анна',
  'Кристина',
  'Аня',
  'Люда',
  'Люба',
  'Оля',
  'Жанна',
  'Рома',
  'Валера',
];

const PHOTO_INFO_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const MIN_COMMENTS_COUNT = 1;
const MAX_COMMENTS_COUNT = 8;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

// Выбираем рандомный элемент из массива
const getRandomArrayElement = (array) => {
  return array[randomNumber(0, array.length - 1)];
}

// Ф-я взята из https://qna.habr.com/q/529902
// Перемешивает элементы массива в рандомном порядке
const shuffleArrayElements = (array) => {
  for(
    // инициализация цикла
    let j, x, i = array.length;
    // условие остановки (i<=0)
    i;
    // итерации цикла
    j = parseInt(Math.random() * i),
    x = array[--i], // i здесь уменьшается до нуля
    array[i] = array[j],
    array[j] = x
  );
}

// Формируем один обьект (комментарий)
const createOneComment = (uniqueRandomIndex) => {
  return {
    id: uniqueRandomIndex,
    avatar: 'img/avatar-'+ randomNumber(MIN_AVATAR, MAX_AVATAR) + '.svg',
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
}

// Создаем массив с обьектами, где каждый обьект это отдельный комментарий
const createComments = (photoObjectIndex) => {
  // Число комментариев для каждого фото будет рандомным от 1 до 8
  const commentsQuantity = randomNumber(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);

  // Определяем коеффициет, чтобы айдишки комментариев не повторялись у разных обьектов (с описаниями фото)
  const koef = MAX_COMMENTS_COUNT * (photoObjectIndex - 1);

  // Формируем массив с обьектами (комментариями)
  return new Array(commentsQuantity).fill(null).map((item, index) => createOneComment(commentsIds[index + (koef)]));
}

// Формируем один обьект (описание фотографии)
const createPhotoInfo = (uniqueIndex) => {
  return {
    id: uniqueIndex,
    url: 'photos/' + uniqueIndex + '.jpg',
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: randomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: createComments(uniqueIndex),
  };
}

// Формируем массив с айдишками для комментариев
const commentsIds = new Array(PHOTO_INFO_COUNT * MAX_COMMENTS_COUNT).fill(null).map((item, index) => index);

// перемешиваем массив чтобы айдишки получились рандомные у комментариев
shuffleArrayElements(commentsIds);

// Формируем массив с обьектами, каждый обьект - описание фотографии
const photoInfo = new Array(PHOTO_INFO_COUNT).fill(null).map((item, index) => createPhotoInfo(index + 1));

photoInfo;
