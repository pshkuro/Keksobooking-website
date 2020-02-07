'use strict';

(function () {
  // Создание данных
  function createMockAdverts(count) {
    var adverts = [];

    var getAvatar = function (id) {
      return 'img/avatars/user0' + id + '.png';
    };

    var getTitle = function () {
      var TITLES = ['Для влюбленных', 'Большой дом для семьи', 'Прекрасный лофт', 'Небольшой участок', 'Шикарный пентхаус', 'Помещение для бизнеса', 'Жилье в центре', 'Домик у парка'];

      return window.getRandomArrayItem(TITLES);
    };

    var getAddress = function () {
      return window.getRandomInRange(1, 100) + ', ' + window.getRandomInRange(100, 500);
    };

    var getPrice = function () {
      var PRICES = [1700, 1000, 20000, 5000, 1090, 990, 55500, 600];

      return window.getRandomArrayItem(PRICES);
    };

    var getType = function () {
      var TYPES = ['palace', 'flat', 'house', 'bungalo'];

      return window.getRandomArrayItem(TYPES);
    };

    var getRooms = function () {
      return window.getRandomInRange(1, 7);
    };

    var getGuests = function () {
      return window.getRandomInRange(1, 5);
    };

    var getCheckin = function () {
      var CHECKINS = ['12:00', '13:00', '14:00'];

      return window.getRandomArrayItem(CHECKINS);
    };

    var getCheckout = function () {
      var CHECKOUTS = ['12:00', '13:00', '14:00'];

      return window.getRandomArrayItem(CHECKOUTS);
    };

    var getFeatures = function () {
      var FEATURESES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

      return window.getArrayRandomLength(FEATURESES);
    };

    var getDescription = function () {
      var DESCRIPTIONS = ['Снимайте скорее', 'Вам очень понравится', 'Супер место для отдыха'];

      return window.getRandomArrayItem(DESCRIPTIONS);
    };

    var getPhotos = function () {
      var PHOTOSES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

      return window.getArrayRandomLength(PHOTOSES);
    };

    var getX = function () {
      return window.getRandomInRange(1, 1000);
    };

    var getY = function () {
      return window.getRandomInRange(130, 630);
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

  window.advertsData = createMockAdverts(8);

})();

