'use strict';

// Модуль работы с формой фильтрации (фильтрация Pins)
(function () {

  var filtersForm = document.querySelector('.map__filters');
  var houseType = filtersForm.querySelector('#housing-type');
  var housePrice = filtersForm.querySelector('#housing-price');
  var houseRooms = filtersForm.querySelector('#housing-rooms');
  var houseGuests = filtersForm.querySelector('#housing-guests');
  var houseFeatures = filtersForm.querySelector('#housing-features');
  var wifiFeature = houseFeatures.querySelector('#filter-wifi');
  var dishwasherFeature = houseFeatures.querySelector('#filter-dishwasher');
  var parkingFeature = houseFeatures.querySelector('#filter-parking');
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
  function showHouseTypeFilterData() {
    var filteredData = window.dataFilter.filterData(window.adverts, getFilters()); // Массив отфильтрованных данных
    var mapPins = getMapPins();
    var mapCard = getMapCard();

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.map.renderAdvert(filteredData, 5);

    if (mapCard) {
      mapCard.remove();
    }

  }

  // Фильтрация поля "Цена"
  function showHousePriceFilterData() {
    var filteredData = window.dataFilter.filterData(window.adverts, getFilters());
    var mapPins = getMapPins();
    var mapCard = getMapCard();

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.map.renderAdvert(filteredData, 5);

    if (mapCard) {
      mapCard.remove();
    }

  }


  // Фильтрация поля 'Число комнат'
  function showHouseRoomsFilterData() {
    var mapPins = getMapPins();
    var mapCard = getMapCard();
    var filteredData = window.dataFilter.filterData(window.adverts, getFilters());

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.map.renderAdvert(filteredData, 5);

    if (mapCard) {
      mapCard.remove();
    }

  }


  // Фильтрация поля "Число гостей"
  function showHouseGuestsFilterData() {
    var mapPins = getMapPins();
    var mapCard = getMapCard();
    var filteredData = window.dataFilter.filterData(window.adverts, getFilters());

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.map.renderAdvert(filteredData, 5);

    if (mapCard) {
      mapCard.remove();
    }

  }


  // Фильтрация поля "Удобства"
  function showWifiFeatureFilterData() {
    var mapPins = getMapPins();
    var mapCard = getMapCard();
    var filteredDataByWifi = window.dataFilter.filterData(window.adverts, getFilters());

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.map.renderAdvert(filteredDataByWifi, 5);

    if (mapCard) {
      mapCard.remove();
    }
  }

  function showDishwasherFilterData() {
    var mapPins = getMapPins();
    var mapCard = getMapCard();
    var filteredDataByDishWasher = window.dataFilter.filterData(window.adverts, getFilters());

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.map.renderAdvert(filteredDataByDishWasher, 5);

    if (mapCard) {
      mapCard.remove();
    }
  }

  function showParkingFeatureFilterData() {
    var mapPins = getMapPins();
    var mapCard = getMapCard();
    var filteredDataByParking = window.dataFilter.filterData(window.adverts, getFilters());

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.map.renderAdvert(filteredDataByParking, 5);

    if (mapCard) {
      mapCard.remove();
    }
  }


  function showWasherFeatureFilterData() {
    var mapPins = getMapPins();
    var mapCard = getMapCard();
    var filteredDataByWasher = window.dataFilter.filterData(window.adverts, getFilters());

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.map.renderAdvert(filteredDataByWasher, 5);

    if (mapCard) {
      mapCard.remove();
    }
  }

  function showElevatorFeatureFilterData() {
    var mapPins = getMapPins();
    var mapCard = getMapCard();
    var filteredDataByElevetor = window.dataFilter.filterData(window.adverts, getFilters());

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.map.renderAdvert(filteredDataByElevetor, 5);

    if (mapCard) {
      mapCard.remove();
    }
  }

  function showConditionerFeatureFilterData() {
    var mapPins = getMapPins();
    var mapCard = getMapCard();
    var filteredDataByConditioner = window.dataFilter.filterData(window.adverts, getFilters());

    mapPins.forEach(function (item) {
      item.remove();
    });

    window.map.renderAdvert(filteredDataByConditioner, 5);

    if (mapCard) {
      mapCard.remove();
    }
  }

  window.mapState.mainPage.addEventListener('pageactive', function () {
    houseType.addEventListener('change', showHouseTypeFilterData);
    housePrice.addEventListener('change', showHousePriceFilterData);
    houseRooms.addEventListener('change', showHouseRoomsFilterData);
    houseGuests.addEventListener('change', showHouseGuestsFilterData);
    wifiFeature.addEventListener('change', showWifiFeatureFilterData);
    dishwasherFeature.addEventListener('change', showDishwasherFilterData);
    parkingFeature.addEventListener('change', showParkingFeatureFilterData);
    washerFeature.addEventListener('change', showWasherFeatureFilterData);
    elevatorFeature.addEventListener('change', showElevatorFeatureFilterData);
    conditionerFeature.addEventListener('change', showConditionerFeatureFilterData);
  });

  window.mapState.mainPage.addEventListener('pagedisabled', function () {
    houseType.removeEventListener('change', showHouseTypeFilterData);
    housePrice.removeEventListener('change', showHousePriceFilterData);
    houseRooms.removeEventListener('change', showHouseRoomsFilterData);
    houseGuests.removeEventListener('change', showHouseGuestsFilterData);
    wifiFeature.removeEventListener('change', showWifiFeatureFilterData);
    dishwasherFeature.removeEventListener('change', showDishwasherFilterData);
    parkingFeature.removeEventListener('change', showParkingFeatureFilterData);
    washerFeature.removeEventListener('change', showWasherFeatureFilterData);
    elevatorFeature.removeEventListener('change', showElevatorFeatureFilterData);
    conditionerFeature.removeEventListener('change', showConditionerFeatureFilterData);
  });

  window.mapFilters = {
    filtersForm: filtersForm
  };

})();
