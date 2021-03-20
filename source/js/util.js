// Ф-Я, ВОЗВРАЩАЕТ СЛУЧАЙНОЕ ЦЕЛОЕ ЧИСЛО
const randomNumber = (from, to) => {
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


// ФУНКЦИЯ ДЛЯ ПРОВЕРКИ МАКСИМАЛЬНОЙ ДЛИНЫ СТРОКИ
const checkMaxLength = (text, maxLength) => {
  return text.length <= maxLength;
};

// ФУНКЦИЯ ДЛЯ ПРОВЕРКИ НАЖАТИЯ КЛАВИШИ Escape
const isEscEvent = (evt) => {
  return (evt.key === 'Escape' || evt.key === 'Esc');
};

// ФУНКЦИЯ ДЛЯ ПРОВЕРКИ НАЖАТИЯ КЛАВИШИ Enter
const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

// ФУНКЦИЯ ДЛЯ ПРОВЕРКИ НАЛИЧИЯ В МАССИВЕ ОДИНАКОВЫХ ЭЛЕМЕНТОВ
const hasDuplicate = (array) => {
  return array.some((item, index, array) => {
    return array.indexOf(item) !== index;
  });
};

// ФУНКЦИЯ ДЛЯ УДАЛЕНИЯ ДУБЛИКАТОВ ИЗ МАССИВА
// Взята из https://coderoad.ru/2218999/Удаление-дубликатов-из-массива-объектов-в-JavaScript
const clearDuplicate = (array, keyField) => {
  return array.filter((item, index, array) => array.findIndex(itemFindIndex => (itemFindIndex[keyField] === item[keyField])) === index);
};

// Ф-я приводит все элементы массива к нижнему регистру
const ignoreCase = (array) => {
  return array.map(item => item.toLowerCase());
}

export { randomNumber, checkMaxLength, isEscEvent, isEnterEvent, hasDuplicate, ignoreCase, clearDuplicate };
