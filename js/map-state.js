'use strict';

// Переключение состояния страницы - Active/Disabled
(function () {

  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGHT = 65;
  var MAP_PIN_MAIN_TIP_HEIGHT = 22;
  var ENTER = 'Enter';

  var isDisabled = true; // Проверка в каком состоянии находится страинца
  var errorMessageTemplate = document.querySelector('#error');
  var errorMessage = errorMessageTemplate.content.querySelector('.error');
  var successMessageTemplate = document.querySelector('#success');
  var successMessage = successMessageTemplate.content.querySelector('.success');
  window.dataForm = document.querySelector('.ad-form');
  var filtersForm = document.querySelector('.map__filters');
  var addressField = window.dataForm.querySelector('#address');
  var mapMain = document.querySelector('.map');
  window.mapPinMain = document.querySelector('.map__pin--main');

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

  var mapPinCentralLocationX = getPinCenterLocation(window.mapPinMain.style.left, MAP_PIN_MAIN_WIDTH);
  var mapPinCentralLocationY = getPinCenterLocation(window.mapPinMain.style.top, MAP_PIN_MAIN_HEIGHT);

  function startPageState() {
    isDisabled = true;
    window.setDisabledFormFields(window.dataForm, true);
    window.setDisabledFormFields(filtersForm, true);
    setAddress(mapPinCentralLocationX, mapPinCentralLocationY);
  }

  startPageState();


  // Обработчик ошибок
  window.errorHandler = function () {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    // node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var initialTop = window.mapPinMain.style.top;
  var initialLeft = window.mapPinMain.style.left;

  // Сброс положения mapPinMain при disabled
  function restoreMapPinMainPosition() {
    window.mapPinMain.style.top = initialTop;
    window.mapPinMain.style.left = initialLeft;
  }

  // Активное состояние страницы
  // Функция активации страницы
  var makePageActive = function () {
    isDisabled = false;
    mapMain.classList.remove('map--faded');
    window.setDisabledFormFields(filtersForm, false);
    window.setDisabledFormFields(window.dataForm, false);
    window.dataForm.classList.remove('ad-form--disabled');
    setAddress(mapPinCentralLocationX, mapPinCentralLocationY, MAP_PIN_MAIN_TIP_HEIGHT); // функция опред адреса в соотв с перемещаемой меткой
    // Получила данные с сервера и отобразила. В качестве параметоров (onLoad - анонимная функция, onError).
    window.getAdverts(
        function (data) {
          window.renderAdvert(data);
          window.adverts = data;
        }, window.errorHandler);
  };

  // Функция блокировки страницы
  function makePageDisabled() {
    var mapPins = mapMain.querySelectorAll('.map__pin');
    var mapCard = document.querySelector('.map__card');
    mapPins.forEach(function (i) {
      if (i !== window.mapPinMain) {
        i.remove();
      }
    });
    mapCard.remove();
    mapMain.classList.add('map--faded');
    window.dataForm.classList.add('ad-form--disabled');
    startPageState();
    restoreMapPinMainPosition();
  }

  // Отправка данных формы на сервер
  window.dataForm.addEventListener('submit', function (evt) {
    window.sendData(new FormData(window.dataForm), function () {
      window.dataForm.reset(); // Сбрасываем форму
      makePageDisabled(); // Возвращаем страницу в disabled состояние
    }, window.errorHandler);
    evt.preventDefault();
  });


  function getPinLocation(location, size) {
    var pinLocation = (parseInt(location, 10) + size);
    return Math.round(pinLocation);
  }

  // Обновляем значение поля адрес, когда pin в джвижении
  function updateFormAddress() {
    var mapPinLocationX = getPinLocation(window.mapPinMain.style.left, MAP_PIN_MAIN_WIDTH);
    var mapPinLocationY = getPinLocation(window.mapPinMain.style.top, MAP_PIN_MAIN_HEIGHT);

    setAddress(mapPinLocationX, mapPinLocationY, MAP_PIN_MAIN_TIP_HEIGHT);
  }


  window.mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.which === 1 && isDisabled === true) {
      makePageActive();
    }
  });

  window.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER && isDisabled === true) {
      makePageActive();
    }
  });

  window.updateFormAddress = updateFormAddress;
  window.MAP_PIN_HEIGHT = MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_TIP_HEIGHT;
})();
