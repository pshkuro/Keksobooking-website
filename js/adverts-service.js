'use strict';

// Сервис для получения данных с сервера и отправки данных
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';

  var getAdverts = function (onLoad, onError) {
    window.backend.load(onLoad, onError, URL);
  };

  var sendData = function (data, onLoad, onError) {
    window.backend.save(data, onLoad, onError, URL_SAVE);
  };


  window.advertsService = {
    getAdverts: getAdverts,
    sendData: sendData
  };

})();

