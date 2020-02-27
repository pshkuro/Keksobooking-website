'use strict';

// Модуль, который управляет карточками объявлений и метками:
// добавляет на страницу нужную карточку,
// отрисовывает метки и осуществляет взаимодействие карточки и метки на карте;
(function () {

  var mapPinsElement = document.querySelector('.map__pins'); // Эл, в кот будем отрисовывать объявления
  var mapFilterContainerElement = document.querySelector('.map__filters-container');
  var prevCardItem = null;
  var activeMapPin = null;

  // Отображение меток объявлений на странице
  var renderAdvert = window.debounce.debounce(function (data, k) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length && i < k; i++) {
      fragment.appendChild(window.pin.createAdvertItem(data[i]));
    }

    mapPinsElement.appendChild(fragment);
  });

  // Отображаем карточку объявления при клике на соотвсетвующую метку
  function showMapPins(evt) {
    var clickElement = evt.target;
    // Получаем значение по клику. Если null то клик произошел не на кнопку(мы ищем ее по селектору)
    var mapPin = clickElement.closest('.map__pin:not(.map__pin--main)');

    if (mapPin) {
      var mapId = mapPin.dataset.id;
      var mapPinData = window.adverts[mapId]; // Передаю в качестве данных - данные с сервера
      var cardItem = window.card.createCardItem(mapPinData);
      var cardItemCloseButton = cardItem.querySelector('.popup__close');

      if (activeMapPin) {
        activeMapPin.classList.remove('map__pin--active');
      }

      mapPin.classList.add('map__pin--active');
      activeMapPin = mapPin;

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
  }

  window.mapState.mainPage.addEventListener('pageactive', function () {
    mapPinsElement.addEventListener('click', showMapPins);
  });

  window.mapState.mainPage.addEventListener('pagedisabled', function () {
    mapPinsElement.removeEventListener('click', showMapPins);
  });

  // Перемещение mapMainPin по карте -> заполнение поля address
  var dragStartHandle = function () {
    window.mapState.updateFormAddress();
  };

  var dragMoveHandle = function () {
    window.mapState.updateFormAddress();
  };

  var dragEndHandle = function () {
    window.mapState.updateFormAddress();
  };

  window.dragndrop.translateElement(window.mapState.mapPinMain, {
    onDragStart: dragStartHandle,
    onDragMove: dragMoveHandle,
    onDragEnd: dragEndHandle
  },
  {
    top: 130,
    floor: 630,
    pinHeight: window.mapState.MAP_PIN_HEIGHT
  });

  window.map = {
    renderAdvert: renderAdvert
  };

})();
