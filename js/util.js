'use strict';

(function () {

  // Функция генерации случ числа от min до max
  window.getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Функция генерации случ эл заданного массива
  window.getRandomArrayItem = function (arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
  };

  // Функция получения массива случайной длины
  window.getArrayRandomLength = function (arr) {
    var randomLength = window.getRandomInRange(1, arr.length);

    return arr.slice(0, randomLength);
  };

  // Функция Блокировки и Разблокировки полей формы
  window.setDisabledFormFields = function (form, disabled) {
    var formChildren = form.children;
    for (var i = 0; i < formChildren.length; i++) {
      formChildren[i].disabled = disabled;
    }
  };
})();

