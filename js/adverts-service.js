'use strict';

// Сервис для получения данных с сервера и отправки данных
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';

  var getAdverts = function (onLoad, onError) {
    window.load(onLoad, onError, URL);
  };

  var sendData = function (data, onLoad, onError) {
    window.save(data, onLoad, onError, URL_SAVE);
  };

  window.getAdverts = getAdverts;
  window.sendData = sendData;
})();

