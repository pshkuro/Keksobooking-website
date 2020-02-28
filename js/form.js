'use strict';
// Модуль работы с формами
(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var HEADER_PREVIEW_PICTURE = 'img/muffin-grey.svg';
  var timeinSelect = window.mapState.dataForm.elements['timein'];
  var timeoutSelect = window.mapState.dataForm.elements['timeout'];
  var propertyPhotoPreview = document.querySelector('.ad-form__photo');
  var propertyPhotoFileChooser = document.querySelector('.ad-form__input');
  var headerPreview = document.querySelector('.ad-form-header__preview img');
  var headerFileChooser = document.querySelector('.ad-form-header__input');
  var resetButton = document.querySelector('.ad-form__reset');


  // Валидация
  // Поля Комнаты и Количество мест
  function validateRoomNumbersAndCapacity() {
    var roomNumbersSelect = window.mapState.dataForm.elements['room_number'];
    var capacitySelect = window.mapState.dataForm.elements['capacity'];
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

  // Цена жилья
  function setMinPrice() {
    var typeHouseSelect = window.mapState.dataForm.elements['type'];
    var housePriceSelect = window.mapState.dataForm.querySelector('#price');

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
      housePriceSelect.placeholder = requirement;
    }
  }
  setMinPrice();

  // Поля Заезд и выезд
  function setTimeIn() {
    timeoutSelect.value = timeinSelect.value;
  }

  function setTimeOut() {
    timeinSelect.value = timeoutSelect.value;
  }


  // Загрузка аватарки и фотографии жилья
  function uploadHeaderPhoto() {
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
  }


  function uploadPropertyPhotos() {
    var image = propertyPhotoPreview.querySelector('img');
    var file = propertyPhotoFileChooser.files[0];
    var fileName = file.name.toLowerCase();

    if (image === null) {
      image = document.createElement('img');
      propertyPhotoPreview.append(image);
      image.width = propertyPhotoPreview.offsetWidth;
      image.height = propertyPhotoPreview.offsetHeight;
    }


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
  }

  function removeUploadedPictures() {
    headerPreview.src = HEADER_PREVIEW_PICTURE;
    var image = propertyPhotoPreview.querySelector('img');
    if (image) {
      propertyPhotoPreview.removeChild(image);
    }
  }

  function resetForm() {
    window.mapState.dataForm.reset();
    window.mapState.makePageDisabled();
    removeUploadedPictures();
  }

  window.mapState.mainPage.addEventListener('pageactive', function () {
    propertyPhotoFileChooser.addEventListener('change', uploadPropertyPhotos);
    headerFileChooser.addEventListener('change', uploadHeaderPhoto);
    window.mapState.dataForm.elements['room_number'].addEventListener('change', validateRoomNumbersAndCapacity);
    window.mapState.dataForm.elements['capacity'].addEventListener('change', validateRoomNumbersAndCapacity);
    window.mapState.dataForm.elements['type'].addEventListener('change', setMinPrice);
    window.mapState.dataForm.querySelector('#price').addEventListener('change', setMinPrice);
    window.mapState.dataForm.elements['timein'].addEventListener('change', setTimeIn);
    window.mapState.dataForm.elements['timeout'].addEventListener('change', setTimeOut);
    resetButton.addEventListener('click', resetForm);
  });

  window.mapState.mainPage.addEventListener('pagedisabled', function () {
    propertyPhotoFileChooser.removeEventListener('change', uploadPropertyPhotos);
    headerFileChooser.removeEventListener('change', uploadHeaderPhoto);
    window.mapState.dataForm.elements['room_number'].removeEventListener('change', validateRoomNumbersAndCapacity);
    window.mapState.dataForm.elements['capacity'].removeEventListener('change', validateRoomNumbersAndCapacity);
    window.mapState.dataForm.elements['type'].removeEventListener('change', setMinPrice);
    window.mapState.dataForm.querySelector('#price').removeEventListener('change', setMinPrice);
    resetButton.removeEventListener('click', resetForm);
  });

  window.form = {
    removeUploadedPictures: removeUploadedPictures,
    setMinPrice: setMinPrice
  };

})();
