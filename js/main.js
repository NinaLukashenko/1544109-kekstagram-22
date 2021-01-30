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
  return (text.length <= maxLength) ? true : false;
}

checkMaxLength('abcdeff', 10);
