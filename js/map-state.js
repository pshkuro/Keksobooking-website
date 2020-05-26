'use strict';

// Переключение состояния страницы - Active/Disabled
(function () {

  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGHT = 65;
  var MAP_PIN_MAIN_TIP_HEIGHT = 22;
  var ENTER = 'Enter';
  var ESC = 'Escape';
  var isDisabled = true; 
  var filtersForm = document.querySelector('.map__filters');
  var addressField = document.querySelector('#address');
  var mapMain = document.querySelector('.map');
  var dataForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');

  var pageActiveEvent = new Event('pageactive');
  var pageDisabledEvent = new Event('pagedisabled');

  // Функция вызова события
  function dispatchPageActiveEvent() {
    mainPage.dispatchEvent(pageActiveEvent);
  }


  function dispatchPageDisabledEvent() {
    mainPage.dispatchEvent(pageDisabledEvent);
  }

  // Вставляем адрес формы поля Адрес в соотв координатами центра метки
  // Координаты центра метки по X и по Y
  function getPinCenterLocation(location, size) {
    var pinLocation = (parseInt(location, 10) + size / 2);
    return Math.round(pinLocation);
  }

  function setAddress(locationX, locationY, heightTip) {
    if (heightTip) {
      addressField.value = locationX + ' ,' + (locationY + heightTip);
    } else {
      addressField.value = locationX + ' ,' + locationY;
    }
  }

  var mapPinCentralLocationX = getPinCenterLocation(mapPinMain.style.left, MAP_PIN_MAIN_WIDTH);
  var mapPinCentralLocationY = getPinCenterLocation(mapPinMain.style.top, MAP_PIN_MAIN_HEIGHT);

  function startPageState() {
    isDisabled = true;
    window.util.setDisabledFormFields(dataForm, true);
    window.util.setDisabledFormFields(filtersForm, true);
    setAddress(mapPinCentralLocationX, mapPinCentralLocationY);
  }

  startPageState();


  // Обработчик ошибок
  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  var initialTop = mapPinMain.style.top;
  var initialLeft = mapPinMain.style.left;

  // Сброс положения mapPinMain при disabled
  function restoreMapPinMainPosition() {
    mapPinMain.style.top = initialTop;
    mapPinMain.style.left = initialLeft;
  }

  // Активное состояние страницы
  // Функция активации страницы
  var makePageActive = function () {
    isDisabled = false;
    mapMain.classList.remove('map--faded');
    window.util.setDisabledFormFields(dataForm, false);
    dataForm.classList.remove('ad-form--disabled');
    setAddress(mapPinCentralLocationX, mapPinCentralLocationY, MAP_PIN_MAIN_TIP_HEIGHT); // функция опред адреса в соотв с перемещаемой меткой
    dispatchPageActiveEvent();
    // Получила данные с сервера и отобразила. В качестве параметоров (onLoad - анонимная функция, onError).
    window.advertsService.getAdverts(function (data) {
      window.adverts = data.map(function (item, index) {
        item.id = index;
        return item;
      });

      window.map.renderAdvert(window.adverts, 5);
      window.util.setDisabledFormFields(filtersForm, false);
    }, errorHandler);
  };

  // Функция блокировки страницы
  function makePageDisabled() {
    var mapPins = mapMain.querySelectorAll('.map__pin');
    var mapCard = document.querySelector('.map__card');
    mapPins.forEach(function (pinItem) {
      if (pinItem !== mapPinMain) {
        pinItem.remove();
      }
    });
    if (mapCard) {
      mapCard.remove();
    }
    mapMain.classList.add('map--faded');
    dataForm.classList.add('ad-form--disabled');
    startPageState();
    restoreMapPinMainPosition();
    dispatchPageDisabledEvent();
    window.form.removeUploadedPictures();
    window.mapFilters.filtersForm.reset();
    window.form.setMinPrice();
  }

  var mainPage = document.querySelector('main');
  var successMessageTemplate = document.querySelector('#success');
  var successMessage = successMessageTemplate.content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error');
  var errorMessage = errorMessageTemplate.content.querySelector('.error');
  var errorMessageButton = errorMessageTemplate.content.querySelector('.error__button');

  // Сообщение о успешной загрузке данных
  function createSuccessMessage() {
    var successMessageElement = successMessage.cloneNode(true);

    mainPage.appendChild(successMessageElement);

    document.addEventListener('keydown', function removeListener(evt) {
      if (evt.key === ESC) {
        successMessageElement.remove();
      }

      document.removeEventListener('keydown', removeListener);
    });


    document.addEventListener('click', function removeListener() {
      successMessageElement.remove();
      document.removeEventListener('click', removeListener);
    });
  }

  // Сообщение об ошибке
  function createErrorMessage() {
    var errorMessageElement = errorMessage.cloneNode(true);

    mainPage.appendChild(errorMessageElement);

    document.addEventListener('keydown', function removeListener(evt) {
      if (evt.key === ESC) {
        errorMessageElement.remove();
      }

      document.removeEventListener('keydown', removeListener);
    });

    document.addEventListener('click', function removeListener() {
      errorMessageElement.remove();
      document.removeEventListener('click', removeListener);
    });

    errorMessageButton.addEventListener('click', function removeListener(evt) {
      evt.preventDefault();
      errorMessageElement.remove();
      document.removeEventListener('click', removeListener);
    });
  }

  // Отправка данных формы на сервер
  function sendFormData(evt) {
    window.advertsService.sendData(new FormData(dataForm), function () {
      dataForm.reset(); // Сбрасываем форму
      makePageDisabled(); // Возвращаем страницу в disabled состояние
      createSuccessMessage();
    }, createErrorMessage);
    evt.preventDefault();
  }

  function getPinLocation(location, size) {
    var pinLocation = (parseInt(location, 10) + size);
    return Math.round(pinLocation);
  }

  // Обновляем значение поля адрес, когда pin в джвижении
  function updateFormAddress() {
    var mapPinLocationX = getPinLocation(mapPinMain.style.left, MAP_PIN_MAIN_WIDTH);
    var mapPinLocationY = getPinLocation(mapPinMain.style.top, MAP_PIN_MAIN_HEIGHT);

    setAddress(mapPinLocationX, mapPinLocationY, MAP_PIN_MAIN_TIP_HEIGHT);
  }

  var MAP_PIN_HEIGHT = MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_TIP_HEIGHT;

  // Активация страницы при нажатии на map-main-pin
  function activePageByMouse(evt) {
    if (evt.which === 1 && isDisabled === true) {
      makePageActive();
    }
  }

  function activePageByKey(evt) {
    if (evt.key === ENTER && isDisabled === true) {
      makePageActive();
    }
  }

  mapPinMain.addEventListener('mousedown', activePageByMouse);
  mapPinMain.addEventListener('keydown', activePageByKey);

  mainPage.addEventListener('pageactive', function () {
    dataForm.addEventListener('submit', sendFormData);
  });

  mainPage.addEventListener('pagedisabled', function () {
    dataForm.removeEventListener('submit', sendFormData);
  });


  window.mapState = {
    dataForm: dataForm,
    mapPinMain: mapPinMain,
    makePageDisabled: makePageDisabled,
    mainPage: mainPage,
    updateFormAddress: updateFormAddress,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT
  };

})();
