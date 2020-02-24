'use strict';

// Модуль работы с формой фильтрации (фильтрация Pins)
(function () {

  var filtersForm = document.querySelector('.map__filters-container');
  var houseType = filtersForm.querySelector('#housing-type');
  var housePrice = filtersForm.querySelector('#housing-price');
  var houseRooms = filtersForm.querySelector('#housing-rooms');
  var houseGuests = filtersForm.querySelector('#housing-guests');
  var houseFeatures = filtersForm.querySelector('#housing-features');
  var wifiFeature = houseFeatures.querySelector('#filter-wifi');
  var dishwasherFeature = houseFeatures.querySelector('#filter-dishwasher');
  var parkinfFeature = houseFeatures.querySelector('#filter-parking');
  var washerFeature = houseFeatures.querySelector('#filter-washer');
  var elevatorFeature = houseFeatures.querySelector('#filter-elevator');
  var conditionerFeature = houseFeatures.querySelector('#filter-conditioner');

  function getMapCard() {
    return document.querySelector('.map__card');
  }

  function getFilters() {
    var inputs = [houseType, housePrice, houseRooms, houseGuests];
    var filters = {};

    inputs.forEach(function (input) {
      filters[input.name] = input.value;
    });

    filters[houseFeatures.id] = {};
    Array.from(houseFeatures.elements).forEach(function (feature) {
      filters[houseFeatures.id][feature.value] = feature.checked;
    });
    return filters;
  }

  getFilters();

  // Коллекция DOM - элементов пинов
  function getMapPins() {
    return document.querySelectorAll('.map__pin:not(.map__pin--main)');
  }

  // Фильтрация поля "Тип жилья"
  houseType.addEventListener('change', function () {
    var filteredData = window.filterData(window.adverts, getFilters()); // Массив отфильтрованных данных
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

  // Фильтрация поля "Цена"
  housePrice.addEventListener('change', function () {
    var filteredData = window.filterData(window.adverts, getFilters());
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


  // Фильтрация поля 'Число комнат'
  houseRooms.addEventListener('change', function () {
    var mapPins = getMapPins();
    var mapCard = getMapCard();
    var filteredData = window.filterData(window.adverts, getFilters());

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.renderAdvert(filteredData, 5);

    if (mapCard) {
      mapCard.remove();
    }

  });


  // Фильтрация поля "Число гостей"
  houseGuests.addEventListener('change', function () {
    var mapPins = getMapPins();
    var mapCard = getMapCard();
    var filteredData = window.filterData(window.adverts, getFilters());

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.renderAdvert(filteredData, 5);

    if (mapCard) {
      mapCard.remove();
    }

  });


  // Фильтрация поля "Удобства"
  wifiFeature.addEventListener('change', function () {
    var mapPins = getMapPins();
    var mapCard = getMapCard();
    var filteredDataByWifi = window.filterData(window.adverts, getFilters());

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.renderAdvert(filteredDataByWifi, 5);

    if (mapCard) {
      mapCard.remove();
    }
  });

  dishwasherFeature.addEventListener('change', function () {
    var mapPins = getMapPins();
    var mapCard = getMapCard();
    var filteredDataByDishWasher = window.filterData(window.adverts, getFilters());

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.renderAdvert(filteredDataByDishWasher, 5);

    if (mapCard) {
      mapCard.remove();
    }
  });

  parkinfFeature.addEventListener('change', function () {
    var mapPins = getMapPins();
    var mapCard = getMapCard();
    var filteredDataByParking = window.filterData(window.adverts, getFilters());

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.renderAdvert(filteredDataByParking, 5);

    if (mapCard) {
      mapCard.remove();
    }
  });

  washerFeature.addEventListener('change', function () {
    var mapPins = getMapPins();
    var mapCard = getMapCard();
    var filteredDataByWasher = window.filterData(window.adverts, getFilters());

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.renderAdvert(filteredDataByWasher, 5);

    if (mapCard) {
      mapCard.remove();
    }
  });

  elevatorFeature.addEventListener('change', function () {
    var mapPins = getMapPins();
    var mapCard = getMapCard();
    var filteredDataByElevetor = window.filterData(window.adverts, getFilters());

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.renderAdvert(filteredDataByElevetor, 5);

    if (mapCard) {
      mapCard.remove();
    }
  });

  conditionerFeature.addEventListener('change', function () {
    var mapPins = getMapPins();
    var mapCard = getMapCard();
    var filteredDataByConditioner = window.filterData(window.adverts, getFilters());

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.renderAdvert(filteredDataByConditioner, 5);

    if (mapCard) {
      mapCard.remove();
    }
  });

})();
