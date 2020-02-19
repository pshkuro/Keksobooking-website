'use strict';

// Модуль работы с формой фильтрации (фильтрация Pins)
(function () {

  var filtersForm = document.querySelector('.map__filters-container');
  var houseType = filtersForm.querySelector('#housing-type');
  var housePrice = filtersForm.querySelector('#housing-price');
  var houseRooms = filtersForm.querySelector('#housing-rooms');
  var houseGuests = filtersForm.querySelector('#housing-guests');
  var houseFeatures = filtersForm.querySelector('#housing-features');

  function getMapCard() {
    return document.querySelector('.map__card');
  }

  // Коллекция DOM - элементов пинов
  function getMapPins() {
    return document.querySelectorAll('.map__pin:not(.map__pin--main)');
  }

  // Фильтрация поля "Тип жилья"
  houseType.addEventListener('change', function () {
    var filteredData = filterByPropertyType(window.adverts, houseType.value); // Массив отфильтрованных данных
    var mapPins = getMapPins();
    var mapCard = getMapCard();

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.renderAdvert(filteredData, 5);

    if (mapCard) {
      mapCard.remove();
    }

  });

  // Получаем массив элементов, подходящих под фильтрацию
  function filterByPropertyType(data, type) {
    if (type === 'any') {
      return data;
    }

    return data.filter(function (dataItem) {
      return dataItem.offer.type === type;
    });
  }


  // Фильтрация поля "Цена"
  housePrice.addEventListener('change', function () {
    var filteredData = filterByPrice(window.adverts, housePrice.value);
    var mapPins = getMapPins();
    var mapCard = getMapCard();

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.renderAdvert(filteredData, 5);

    if (mapCard) {
      mapCard.remove();
    }

  });

  function filterByPrice(data, price) {
    switch (price) {
      case 'middle':
        return data.filter(function (dataItem) {
          return dataItem.offer.price >= 10000 && dataItem.offer.price <= 50000;
        });

      case 'low':
        return data.filter(function (dataItem) {
          return dataItem.offer.price <= 10000;
        });

      case 'high':
        return data.filter(function (dataItem) {
          return dataItem.offer.price >= 50000;
        });
    }
    return data;
  }

  // Фильтрация поля 'Число комнат'
  houseRooms.addEventListener('change', function () {
    var mapPins = getMapPins();
    var mapCard = getMapCard();
    var filteredData = filteredByRooms(window.adverts, houseRooms.value);

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.renderAdvert(filteredData, 5);

    if (mapCard) {
      mapCard.remove();
    }

  });

  function filteredByRooms(data, rooms) {
    if (rooms === 'any') {
      return data;
    }

    return data.filter(function (dataItem) {
      return dataItem.offer.rooms === Number(rooms);
    });
  }

})();
