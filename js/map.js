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
  var mapFilterContainerElement = document.querySelector('.map__filters-container');
  var prevCardItem = null;

  mapPinsElement.addEventListener('click', function (evt) {
    var clickElement = evt.target;
    // Получаем значение по клику. Если null то клик произошел не на кнопку(мы ищем ее по селектору)
    var mapPin = clickElement.closest('.map__pin:not(.map__pin--main)');

    if (mapPin) {
      var mapId = mapPin.dataset.id;
      var mapPinData = window.adverts[mapId]; // Передаю в качестве данных - данные с сервера
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

  // Перемещение mapMainPin по карте -> заполнение поля address
  var dragStartHandle = function () {
    window.updateFormAddress();
  };
  var dragMoveHandle = function () {
    window.updateFormAddress();
  };
  var dragEndHandle = function () {
    window.updateFormAddress();
  };

  window.translateElement(window.mapPinMain, {
    onDragStart: dragStartHandle,
    onDragMove: dragMoveHandle,
    onDragEnd: dragEndHandle
  },
  {
    top: 130,
    floor: 630,
    pinHeight: window.MAP_PIN_HEIGHT
  });

})();
