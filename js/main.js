// Ф-Я, ВОЗВРАЩАЕТ СЛУЧАЙНОЕ ЦЕЛОЕ ЧИСЛО
const randomNumber = function(from, to) {
  // если хотя бы одно из значений отрицательное
  if (from < 0 || to < 0) {
    return alert('Both numbers should be more than zero!');
  }

  // значение «от» равное значению «до»
  if (from === to) {
    return alert('Numbers should be different!');
  }

  // значение «от» больше, чем значение «до»
  if (from > to) {
    return alert('Number "from" should be less than number "to"!');
  }

  // Ф-я ищет случайное число из диапазона (оба числа включительно)
  // взята из https://schoolsw3.com/js/js_random.php
  return Math.floor(Math.random() * (to - from + 1) ) + from;
};

randomNumber(2, 5);

// ФУНКЦИЯ ДЛЯ ПРОВЕРКИ МАКСИМАЛЬНОЙ ДЛИНЫ СТРОКИ
const checkMaxLength = function(text, maxLength) {
  return text.length <= maxLength;
}

checkMaxLength('abcdeff', 10);

// ** HOMEWORK 2 **
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
    avatar: 'img/avatar-'+ randomNumber(1, 6) + '.svg',
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
}

// Создаем массив с обьектами, где каждый обьект это отдельный комментарий
const createComments = (photoObjectIndex) => {
  // Число комментариев для каждого фото будет рандомным от 1 до 8
  const COMMENTS_QUANTITY = randomNumber(1, 8);

  // Определяем коеффициет, чтобы айдишки комментариев не повторялись у разных обьектов (с описаниями фото)
  const koef = 8 * (photoObjectIndex - 1);

  // Формируем массив с обьектами (комментариями)
  return new Array(COMMENTS_QUANTITY).fill(null).map((item, index) => createOneComment(commentsIds[index + (koef)]));
}

// Формируем один обьект (описание фотографии)
const createPhotoInfo = (uniqueIndex) => {
  return {
    id: uniqueIndex,
    url: 'photos/' + uniqueIndex + '.jpg',
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: randomNumber(15, 200),
    comments: createComments(uniqueIndex),
  };
}

// Максимальное число комментарие 25 * 8 = 200
// (всего 25 обьектов с описанием фото и в каждои из них может быть максимум 8 комментариев)
const commentsIds = new Array(200).fill(null).map((item, index) => index);

// перемешиваем массив чтобы айдишки получились рандомные у комментариев
shuffleArrayElements(commentsIds);

// Формируем массив с обьектами, каждый обьект - описание фотографии
const photoInfo = new Array(PHOTO_INFO_COUNT).fill(null).map((item, index) => createPhotoInfo(index + 1));

photoInfo();
