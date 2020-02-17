'use strict';

// Модуль работы с формой фильтрации (фильтрация Pins)
(function () {

  // Фильтрация поля "Тип жилья"
  var houseType = document.querySelector('#housing-type');

  houseType.addEventListener('change', function () {
    var mapCard = document.querySelector('.map__card');
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)'); // Коллекция DOM - элементов пинов
    var filteredData = filterByPropertyType(window.adverts, houseType.value); // Массив отфильтрованных данных


    mapPins.forEach(function (item) {
      item.remove();
    });

    window.renderAdvert(filteredData, 5);

    if (mapCard) {
      mapCard.remove();
    }

  });

  // Получаем массив элементов, не подходящих под фильтрацию
  function filterByPropertyType(data, type) {
    if (type === 'any') {
      return data;
    }

    return data.filter(function (dataItem) {
      return dataItem.offer.type === type;
    });
  }


})();
