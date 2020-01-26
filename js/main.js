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
var createMockAdverts = function (count) {
  var getAvatar = function (id) {
    return 'img/avatars/user' + id + '.png';
  };

  var getTitle = function () {
    var TITLES = ['Дом', 'Квартира', 'Лофт', 'Участок', 'Пентхаус', 'Помещение', 'Жилье', 'Домик'];

    return getRandomArrayItem(TITLES);
  };

  var getAddress = function (x, y) {
    return x + '' + y;
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

  return {
    author: {
      avatar: getAvatar(5)
    },
    offer: {
      title: getTitle(),
      address: getAddress(100, 50),
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
};

console.dir(createMockAdverts());

// Отображение объявлений на странице
var renderAdvert = function(data) {

}