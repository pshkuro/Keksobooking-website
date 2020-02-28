'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var statusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    USER_NOT_AUTHORIZES: 401,
    NOT_FOUND: 404
  };

  var xhr = new XMLHttpRequest();

  // Загрузка данных c сервера
  function load(onLoad, onError, url) {
    xhr.responseType = 'json';
    xhr.open('GET', url);

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case statusCode.OK:
          onLoad(xhr.response);
          break;

        case statusCode.BAD_REQUEST:
          error = 'Неверный запрос';
          break;

        case statusCode.USER_NOT_AUTHORIZES:
          error = 'Пользователь не авторизован';
          break;

        case statusCode.NOT_FOUND:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Что-то пошло не так. Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });


    xhr.send();
  }

  // Функция отправки данных на сервер
  function save(data, onLoad, onError, url) {
    xhr.responseType = 'json';
    xhr.open('POST', url);

    xhr.addEventListener('load', function () {

      var error;
      switch (xhr.status) {
        case statusCode.OK:
          onLoad(xhr.response);
          break;

        case statusCode.BAD_REQUEST:
          error = 'Неверный запрос';
          break;

        case statusCode.USER_NOT_AUTHORIZES:
          error = 'Пользователь не авторизован';
          break;

        case statusCode.NOT_FOUND:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Что-то пошло не так. Cтатус ответа:' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.send(data);
  }

  window.backend = {
    load: load,
    save: save
  };

})();
