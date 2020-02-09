'use strict';

// Переключение состояния страницы - Active/Disabled
(function () {

  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGHT = 65;
  var MAP_PIN_MAIN_TIP_HEIGHT = 22;
  var ENTER = 'Enter';

  window.dataForm = document.querySelector('.ad-form');
  var filtersForm = document.querySelector('.map__filters');
  var addressField = window.dataForm.querySelector('#address');
  var mapMain = document.querySelector('.map');
  window.mapPinMain = document.querySelector('.map__pin--main');


  // Неактивное состояние страницы
  window.setDisabledFormFields(window.dataForm, true);
  window.setDisabledFormFields(filtersForm, true);

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

  setAddress(mapPinCentralLocationX, mapPinCentralLocationY);

  // Активное состояние страницы
  // Функция активации страницы
  var makePageActive = function () {
    mapMain.classList.remove('map--faded');
    window.setDisabledFormFields(filtersForm, false);
    window.setDisabledFormFields(window.dataForm, false);
    window.dataForm.classList.remove('ad-form--disabled');
    window.renderAdvert(window.advertsData); // функция отрисовки меток на карте
    setAddress(mapPinCentralLocationX, mapPinCentralLocationY, MAP_PIN_MAIN_TIP_HEIGHT); // функция опред адреса в соотв с перемещаемой меткой
  };

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
    if (evt.which === 1) {
      makePageActive();
    }
  });

  window.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER) {
      makePageActive();
    }
  });

  window.updateFormAddress = updateFormAddress;
  window.MAP_PIN_HEIGHT = MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_TIP_HEIGHT;
})();
