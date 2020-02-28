'use strict';

// Модуль фильтрации получаемых с сервера данных
(function () {

  var MIN_PROPERTY_PRICE = 10000;
  var MAX_PROPERTY_PRICE = 50000;

  var filterFunctions = {
    'housing-type': filterByHousingType,
    'housing-price': filterByHousingPrice,
    'housing-rooms': filterByHousingRooms,
    'housing-guests': filterByHousingGuests,
    'housing-features': filterByHosungFeatures
  };

  function filterData(data, filters) {
    var filteredData = data;

    for (var filter in filters) {
      if (filters.hasOwnProperty(filter)) {
        var filterValue = filters[filter];
        var filterFunction = filterFunctions[filter];

        filteredData = filterFunction(filteredData, filterValue);
      }
    }

    return filteredData;

  }

  // Функции фильтраций
  // ФФ по типу жилья
  function filterByHousingType(data, type) {
    if (type === 'any') {
      return data;
    }

    return data.filter(function (dataItem) {
      return dataItem.offer.type === type;
    });
  }

  // ФФ по стоимости
  function filterByHousingPrice(data, price) {
    switch (price) {
      case 'middle':
        return data.filter(function (dataItem) {
          return dataItem.offer.price >= MIN_PROPERTY_PRICE && dataItem.offer.price <= MAX_PROPERTY_PRICE;
        });

      case 'low':
        return data.filter(function (dataItem) {
          return dataItem.offer.price <= MIN_PROPERTY_PRICE;
        });

      case 'high':
        return data.filter(function (dataItem) {
          return dataItem.offer.price >= MAX_PROPERTY_PRICE;
        });
    }
    return data;
  }

  // ФФ по кол-ву комнат
  function filterByHousingRooms(data, rooms) {
    if (rooms === 'any') {
      return data;
    }

    return data.filter(function (dataItem) {
      return dataItem.offer.rooms === Number(rooms);
    });
  }

  // ФФ по кол-ву гостей
  function filterByHousingGuests(data, guests) {
    if (guests === 'any') {
      return data;
    }

    return data.filter(function (dataItem) {
      return dataItem.offer.guests === Number(guests);
    });
  }

  // ФФ по удобствам
  function filterByHosungFeatures(data, features) {
    var filteredData = data;

    for (var feature in features) {
      if (features.hasOwnProperty(feature)) {
        var filterValue = features[feature];
        if (filterValue === true) {
          filteredData = filteredData.filter(function (dataItem) {
            return dataItem.offer.features.includes(feature);
          });
        }
      }
    }

    return filteredData;
  }

  window.dataFilter = {
    filterData: filterData
  };


})();
