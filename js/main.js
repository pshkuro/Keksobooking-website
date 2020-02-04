'use strict';

var ENTER = 'Enter';

// Функция генерации случ числа от min до max
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция генерации случ эл заданного массива
function getRandomArrayItem(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

// Функция получения массива случайной длины
function getArrayRandomLength(arr) {
  var randomLength = getRandomInRange(1, arr.length);

  return arr.slice(0, randomLength);
}

// Создание тестовых объявлений
function createMockAdverts(count) {
  var adverts = [];

  var getAvatar = function (id) {
    return 'img/avatars/user0' + id + '.png';
  };

  var getTitle = function () {
    var TITLES = ['Для влюбленных', 'Большой дом для семьи', 'Прекрасный лофт', 'Небольшой участок', 'Шикарный пентхаус', 'Помещение для бизнеса', 'Жилье в центре', 'Домик у парка'];

    return getRandomArrayItem(TITLES);
  };

  var getAddress = function () {
    return getRandomInRange(1, 100) + ', ' + getRandomInRange(100, 500);
  };

  var getPrice = function () {
    var PRICES = [1700, 1000, 20000, 5000, 1090, 990, 55500, 600];

    return getRandomArrayItem(PRICES);
  };

  var getType = function () {
    var TYPES = ['palace', 'flat', 'house', 'bungalo'];

    return getRandomArrayItem(TYPES);
  };

  var getRooms = function () {
    return getRandomInRange(1, 7);
  };

  var getGuests = function () {
    return getRandomInRange(1, 5);
  };

  var getCheckin = function () {
    var CHECKINS = ['12:00', '13:00', '14:00'];

    return getRandomArrayItem(CHECKINS);
  };

  var getCheckout = function () {
    var CHECKOUTS = ['12:00', '13:00', '14:00'];

    return getRandomArrayItem(CHECKOUTS);
  };

  var getFeatures = function () {
    var FEATURESES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

    return getArrayRandomLength(FEATURESES);
  };

  var getDescription = function () {
    var DESCRIPTIONS = ['Снимайте скорее', 'Вам очень понравится', 'Супер место для отдыха'];

    return getRandomArrayItem(DESCRIPTIONS);
  };

  var getPhotos = function () {
    var PHOTOSES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

    return getArrayRandomLength(PHOTOSES);
  };

  var getX = function () {
    return getRandomInRange(1, 1000);
  };

  var getY = function () {
    return getRandomInRange(130, 630);
  };

  for (var i = 0; i < count; i++) {
    var advert = {
      author: {
        avatar: getAvatar(i + 1)
      },
      offer: {
        title: getTitle(),
        address: getAddress(),
        price: getPrice(),
        type: getType(),
        rooms: getRooms(),
        guests: getGuests(),
        checkin: getCheckin(),
        checkout: getCheckout(),
        features: getFeatures(),
        description: getDescription(),
        photos: getPhotos()
      },
      location: {
        x: getX(),
        y: getY()
      }
    };


    adverts.push(advert);
  }

  return adverts;
}

var advertsData = createMockAdverts(8);

var mapPinsElement = document.querySelector('.map__pins'); // Эл, в кот будем отрисовывать объявления
var mapPinTemplate = document.querySelector('#pin'); // Шаблон mapPin(метка объявления)
var mapPinsItem = mapPinTemplate.content.querySelector('.map__pin');
// var mapCardTemplate = document.querySelector('#card'); // Шаблон mapCard(карточка объявления)
// var mapCardItem = mapCardTemplate.content.querySelector('.map__card');

// Получение ширины/высоты mapPin
function getSizeMapPin(size) {
  var valueMapPin = mapPinTemplate.content.querySelector('img')[size];

  return valueMapPin;
}

// Создание 1 метки объявления
var createAdvertItem = function (data) {
  var advertElement = mapPinsItem.cloneNode(true);

  advertElement.style = 'left:' + (data.location.x + getSizeMapPin('width')) + 'px; top:' + (data.location.y + getSizeMapPin('height')) + 'px;';
  advertElement.querySelector('img').src = data.author.avatar;
  advertElement.querySelector('img').alt = data.offer.title;

  return advertElement;
};

// Отображение объявлений на странице
var renderAdvert = function (data) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(createAdvertItem(data[i]));
  }

  mapPinsElement.appendChild(fragment);
};


// // Функция перевода типа жилья на RU
// var getPropertyType = function (type) {
//   var propertyTypes = {
//     'palace': 'Дворец',
//     'flat': 'Квартира',
//     'house': 'Дом',
//     'bungalo': 'Бунгало'
//   };

//   return propertyTypes[type];
// };

// // Создание 1 карточки объявления
// var createCardItem = function (data) {
//   var advertElement = mapCardItem.cloneNode(true);

//   // Функция проверки блока на существование данных и их добавление
//   // element - путь к элементу (advertElement.querySelector('.popup__title')), info - путь к данным массива, render _функц с данными в зав от их типа
//   function createDataCardItem(element, info, render) {
//     if (info) {
//       render();
//     } else {
//       element.style.display = 'none';
//     }
//   }

//   var title = data.offer.title;
//   var popupTitleElement = advertElement.querySelector('.popup__title');
//   var titleRender = function () {
//     popupTitleElement.textContent = title;
//   };
//   createDataCardItem(popupTitleElement, title, titleRender);

//   var address = data.offer.address;
//   var popupAddressElement = advertElement.querySelector('.popup__text--address');
//   var addressRender = function () {
//     popupAddressElement.textContent = address;
//   };
//   createDataCardItem(popupAddressElement, address, addressRender);

//   var price = data.offer.price;
//   var popupPriceElement = advertElement.querySelector('.popup__text--price');
//   var priceRender = function () {
//     popupPriceElement.textContent = price + '₽/ночь';
//   };
//   createDataCardItem(popupPriceElement, price, priceRender);

//   var capacity = data.offer.rooms;
//   var popupCapacityElement = advertElement.querySelector('.popup__text--capacity');
//   var capacityRender = function () {
//     popupCapacityElement.textContent = capacity + ' комнаты для ' + data.offer.guests + ' гостей';
//   };
//   createDataCardItem(popupCapacityElement, capacity, capacityRender);

//   var time = data.offer.checkin;
//   var popupTimeElement = advertElement.querySelector('.popup__text--time');
//   var timeRender = function () {
//     popupTimeElement.textContent = 'Заезд после ' + time + ', выезд до ' + data.offer.checkout;
//   };
//   createDataCardItem(popupTimeElement, time, timeRender);

//   var features = data.offer.features;
//   var popupFeaturesElement = advertElement.querySelector('.popup__features');
//   var featuresRender = function () {
//     popupFeaturesElement.textContent = features;
//   };
//   createDataCardItem(popupFeaturesElement, features, featuresRender);

//   var description = data.offer.description;
//   var popupDescriptionElement = advertElement.querySelector('.popup__description');
//   var descriptionRender = function () {
//     popupDescriptionElement.textContent = description;
//   };
//   createDataCardItem(popupDescriptionElement, description, descriptionRender);

//   var avatar = data.author.avatar;
//   var popupAvatarElement = advertElement.querySelector('.popup__avatar');
//   var avatarRender = function () {
//     popupAvatarElement.src = avatar;
//   };
//   createDataCardItem(popupAvatarElement, avatar, avatarRender);

//   // Отображение переведенного на RU типа жилья в карточке
//   var type = data.offer.type;
//   var propertyType = getPropertyType(type);
//   var popupTypeElement = advertElement.querySelector('.popup__type');
//   var typeRender = function () {
//     popupTypeElement.textContent = propertyType;
//   };
//   createDataCardItem(popupTypeElement, propertyType, typeRender);

//   // Отображаем фотографии из массива photos(удаляем пустой шаблон)
//   var photos = data.offer.photos;
//   var popupPhotos = advertElement.querySelector('.popup__photos');
//   var popupPhotosImageTemplate = popupPhotos.querySelector('img');
//   popupPhotosImageTemplate.remove();

//   var photosRender = function () {
//     for (var i = 0; i < data.offer.photos.length; i++) {
//       var popupPhotosImage = popupPhotosImageTemplate.cloneNode(true);
//       popupPhotosImage.src = data.offer.photos[i];
//       popupPhotos.appendChild(popupPhotosImage);
//     }
//   };
//   createDataCardItem(popupPhotos, photos, photosRender);

//   return advertElement;
// };


// // Создаем DOM-элемент(карточку объявления) на основе 1 эл массива данных, вставляем его в нужный блок
// var cardAdvertElement = createCardItem(advertsData[0]);
// var mapFilterContainerElement = document.querySelector('.map__filters-container');

// mapFilterContainerElement.before(cardAdvertElement);

// Состояние страницы
var MAP_PIN_MAIN_WIDTH = 65;
var MAP_PIN_MAIN_HEIGHT = 65;
var MAP_PIN_MAIN_TIP_HEIGHT = 22;

var dataForm = document.querySelector('.ad-form');
var filtersForm = document.querySelector('.map__filters');
var addressField = dataForm.querySelector('#address');
var mapMain = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');

// Неактивное состояние страницы
// Блокируем все поля формы
function setDisabledFormFields(form, disabled) {
  var formChildren = form.children;
  for (var i = 0; i < formChildren.length; i++) {
    formChildren[i].disabled = disabled;
  }
}

setDisabledFormFields(dataForm, true);
setDisabledFormFields(filtersForm, true);

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

setAddress(mapPinCentralLocationX, mapPinCentralLocationY);

// Активное состояние страницы
// Функция активации страницы
var makePageActive = function () {
  mapMain.classList.remove('map--faded');
  setDisabledFormFields(filtersForm, false);
  setDisabledFormFields(dataForm, false);
  dataForm.classList.remove('ad-form--disabled');
  renderAdvert(advertsData); // функция отрисовки меток на карте
  setAddress(mapPinCentralLocationX, mapPinCentralLocationY, MAP_PIN_MAIN_TIP_HEIGHT); // функция опред адреса в соотв с перемещаемой меткой
};


mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    makePageActive();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER) {
    makePageActive();
  }
});

// Валидация
function validateRoomNumbersAndCapacity() {
  var roomNumbersSelect = dataForm.elements['room_number'];
  var capacitySelect = dataForm.elements['capacity'];

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

dataForm.elements['room_number'].addEventListener('change', function () {
  validateRoomNumbersAndCapacity();
});

dataForm.elements['capacity'].addEventListener('change', function () {
  validateRoomNumbersAndCapacity();
});
