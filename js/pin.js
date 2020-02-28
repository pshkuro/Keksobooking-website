'use strict';

// Модуль создания метки на карте
(function () {

  var mapPinTemplate = document.querySelector('#pin'); // Шаблон mapPin(метка объявления)
  var mapPinsItem = mapPinTemplate.content.querySelector('.map__pin');

  // Получение ширины/высоты mapPin
  function getSizeMapPin(size) {
    return mapPinTemplate.content.querySelector('img')[size];
  }

  // Создание 1 метки объявления
  function createAdvertItem(data) {
    var advertElement = mapPinsItem.cloneNode(true);

    advertElement.style = 'left:' + (data.location.x + getSizeMapPin('width')) + 'px; top:' + (data.location.y + getSizeMapPin('height')) + 'px;';
    advertElement.querySelector('img').src = data.author.avatar;
    advertElement.querySelector('img').alt = data.offer.title;
    advertElement.dataset.id = data.id;
    return advertElement;
  }

  window.pin = {
    createAdvertItem: createAdvertItem
  };

})();

