'use strict';

(function () {
  var mock = {
    'housing-type': 'bungalo',
    'housing-price': 'low',
    'housing-rooms': '2',
    'housing-guests': '1',
    'housing-features': {
      'wifi': true,
      'dishwasher': true,
      'washer': true,
      'parking': false,
      'elevator': false,
      'conditioner': false
    }
  };

  var filterFunctions = {
    'housing-type': filterByHousingType,
    'housing-price': filterByHousingPrice,
    'housing-rooms': filteredByHousingRooms,
    'housing-guests': filteredByHousingGuests,
    'housing-features': filteredByHosungFeatures
  };

  function filterData(data, filters) {
    var filteredData = data;

    for (var filter in filters) {
      var filterValue = filters[filter];
      var filterFunction = filterFunctions[filter];

      filteredData = filterFunction(filteredData, filterValue);
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

  // ФФ по кол-ву комнат
  function filteredByHousingRooms(data, rooms) {
    if (rooms === 'any') {
      return data;
    }

    return data.filter(function (dataItem) {
      return dataItem.offer.rooms === Number(rooms);
    });
  }

  // ФФ по кол-ву гостей
  function filteredByHousingGuests(data, guests) {
    if (guests === 'any') {
      return data;
    }

    return data.filter(function (dataItem) {
      return dataItem.offer.guests === Number(guests);
    });
  }

  // ФФ по удобствам
  function filteredByHosungFeatures(data, features) {
    var filteredData = data;

    for (var feature in features) {
      var filterValue = features[feature];
      if(filterValue === true) {
        filteredData = filteredData.filter(function (dataItem) {
          return dataItem.offer.features.includes(feature);
        });
      };
    }

    return filteredData;
  }

  //   'wifi': true,
  //   'dishwasher': true,
  //   'washer': true,
  //   'parking': false,
  //   'elevator': false,
  //   'conditioner': false


  window.filterData = filterData;
})();
