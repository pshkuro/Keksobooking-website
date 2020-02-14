'use strict';

// Сервис для получения данных с сервера
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  var getAdverts = function (onLoad, onError) {
    window.load(onLoad, onError, URL);
  };

  window.getAdverts = getAdverts;
})();

