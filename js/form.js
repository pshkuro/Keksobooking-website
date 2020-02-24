'use strict';
// Модуль работы с формами
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

  var resetButton = document.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', function removeListener() {
    window.dataForm.reset();
  });

  // Загрузка аватарки и фотографии жилья
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var propertyPhotoPreview = document.querySelector('.ad-form__photo');
  var propertyPhotoFileChooser = document.querySelector('.ad-form__input');
  var headerPreview = document.querySelector('.ad-form-header__preview img');
  var headerFileChooser = document.querySelector('.ad-form-header__input');

  headerFileChooser.addEventListener('change', function () {
    var file = headerFileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        headerPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });


  propertyPhotoFileChooser.addEventListener('change', function () {
    var image = propertyPhotoPreview.querySelector('img');
    if (image === null) {
      image = document.createElement('img');
      propertyPhotoPreview.append(image);
      image.width = propertyPhotoPreview.offsetWidth;
      image.height = propertyPhotoPreview.offsetHeight;
    }

    var file = propertyPhotoFileChooser.files[0];
    var fileName = file.name.toLowerCase();


    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        image.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

})();
