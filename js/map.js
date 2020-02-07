'use strict';

// Модуль, который управляет карточками объявлений и метками:
// добавляет на страницу нужную карточку,
// отрисовывает метки и осуществляет взаимодействие карточки и метки на карте;
(function () {

  var mapPinsElement = document.querySelector('.map__pins'); // Эл, в кот будем отрисовывать объявления

  // Отображение меток объявлений на странице
  window.renderAdvert = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.createAdvertItem(data[i], i));
    }

    mapPinsElement.appendChild(fragment);
  };

  // Отображаем карточку объявления при клике на соотвсетвующую метку
  var mapPins = document.querySelector('.map__pins');
  var mapFilterContainerElement = document.querySelector('.map__filters-container');
  var prevCardItem = null;

  mapPins.addEventListener('click', function (evt) {
    var clickElement = evt.target;
    // Получаем значение по клику. Если null то клик произошел не на кнопку(мы ищем ее по селектору)
    var mapPin = clickElement.closest('.map__pin:not(.map__pin--main)');

    if (mapPin) {
      var mapId = mapPin.dataset.id;
      var mapPinData = window.advertsData[mapId];
      var cardItem = window.createCardItem(mapPinData);
      var cardItemCloseButton = cardItem.querySelector('.popup__close');

      if (prevCardItem) {
        prevCardItem.remove();
      }

      mapFilterContainerElement.before(cardItem); // Отрисовка карточи объвления
      prevCardItem = cardItem;

      cardItemCloseButton.addEventListener('click', function () {
        cardItem.remove();
      });

      document.addEventListener('keydown', function closeOnEscape(evtData) {
        if (evtData.key === 'Escape') {
          cardItem.remove();
          document.removeEventListener('keydown', closeOnEscape);
        }
      });
    }
  });
})();
