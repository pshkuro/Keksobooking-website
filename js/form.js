'use strict';

(function () {
  // Валидация
  // Поля Комнаты и Количество мест
  function validateRoomNumbersAndCapacity() {
    var roomNumbersSelect = window.dataForm.elements['room_number'];
    var capacitySelect = window.dataForm.elements['capacity'];

    var roomNumbers = roomNumbersSelect.value;
    var capacity = capacitySelect.value;

    var requirementMapping = {
      '1': ['1'],
      '2': ['1', '2'],
      '3': ['1', '2', '3'],
      '100': ['0']
    };

    var requirements = requirementMapping[roomNumbers];
    var isValid = false;

    for (var i = 0; i < requirements.length; i++) {
      var requirement = requirements[i];
      if (requirement === capacity) {
        isValid = true;
        break;
      } else {
        isValid = false;
      }
    }

    if (isValid) {
      roomNumbersSelect.setCustomValidity('');
    } else {
      roomNumbersSelect.setCustomValidity('Количество комнат не соотвествует количеству гостей');
    }
  }

  validateRoomNumbersAndCapacity();

  window.dataForm.elements['room_number'].addEventListener('change', function () {
    validateRoomNumbersAndCapacity();
  });

  window.dataForm.elements['capacity'].addEventListener('change', function () {
    validateRoomNumbersAndCapacity();
  });

  // Цена жилья
  function setMinPrice() {
    var typeHouseSelect = window.dataForm.elements['type'];
    var housePriceSelect = window.dataForm.querySelector('#price');

    var typeHouse = typeHouseSelect.value;

    var requirementMapping = {
      'bungalo': ['0'],
      'flat': ['1000'],
      'house': ['5000'],
      'palace': ['10000']
    };

    var requirements = requirementMapping[typeHouse];

    for (var i = 0; i < requirements.length; i++) {
      var requirement = requirements[i];
      housePriceSelect.setAttribute('min', requirement);
    }
  }
  setMinPrice();

  window.dataForm.elements['type'].addEventListener('change', function () {
    setMinPrice();
  });

  window.dataForm.querySelector('#price').addEventListener('change', function () {
    setMinPrice();
  });

  // Поля Заезд и выезд
  function setTimeinAndTimeout() {
    var timeinSelect = window.dataForm.elements['timein'];
    var timeoutSelect = window.dataForm.elements['timeout'];

    window.dataForm.elements['timein'].addEventListener('change', function () {
      var timein = timeinSelect.value;
      timeoutSelect.value = timein;
    });

    window.dataForm.elements['timeout'].addEventListener('change', function () {
      var timeout = timeoutSelect.value;
      timeinSelect.value = timeout;
    });
  }

  setTimeinAndTimeout();

})();
