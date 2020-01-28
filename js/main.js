'use strict';

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
  var randomLength = getRandomInRange(0, arr.length);

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
    var PRICES = [500, 1000, 20, 50, 100, 990, 555, 60];

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
    var DESCRIPTIONS = ['пип', 'пап', 'гав', 'кек'];

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

document.querySelector('.map').classList.remove('map--faded');

var mapPinsElement = document.querySelector('.map__pins'); // Эл, в кот будем отрисовывать объявления
var mapPinTemplate = document.querySelector('#pin'); // Шаблон mapPin(метка объявления)
var mapPinsItem = mapPinTemplate.content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('#card'); // Шаблон mapCard(карточка объявления)
var mapCardItem = mapCardTemplate.content.querySelector('.map__card');

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

// Создание 1 карточки объявления
var createCardItem = function (data) {
  var advertElement = mapCardItem.cloneNode(true);

  advertElement.querySelector('.popup__title').textContent = data.offer.title;
  advertElement.querySelector('.popup__text—address').textContent = data.offer.price + '₽/ночь';
  advertElement.querySelector('.popup__type').textContent = data.offer.type;
  advertElement.querySelector('.popup__text—capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  advertElement.querySelector('.popup__text—time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  advertElement.querySelector('.popup__features').textContent = data.offer.features;
  advertElement.querySelector('.popup__description').textContent = data.offer.description;
  advertElement.querySelector('.popup__photos').src = data.offer.photos;
  advertElement.querySelector('.popup__avatar').src = data.author.avatar;
};

// Отображение объявлений на странице
var renderAdvert = function (data) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(createAdvertItem(data[i]));
  }

  mapPinsElement.appendChild(fragment);
};

renderAdvert(advertsData);


