'use strict';

(function () {

  // Функция генерации случ числа от min до max
  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Функция генерации случ эл заданного массива
  function getRandomArrayItem(arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }

  // Функция получения массива случайной длины
  function getArrayRandomLength(arr) {
    var randomLength = getRandomInRange(1, arr.length);

    return arr.slice(0, randomLength);
  }

  // Функция Блокировки и Разблокировки полей формы
  function setDisabledFormFields(form, disabled) {
    var formChildren = form.children;
    for (var i = 0; i < formChildren.length; i++) {
      formChildren[i].disabled = disabled;
    }
  }

  window.util = {
    getRandomInRange: getRandomInRange,
    getRandomArrayItem: getRandomArrayItem,
    getArrayRandomLength: getArrayRandomLength,
    setDisabledFormFields: setDisabledFormFields
  };
})();

