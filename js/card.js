'use strict';

// Модуль создания карточки объявления
(function () {

  var mapCardTemplate = document.querySelector('#card'); // Шаблон mapCard(карточка объявления)
  var mapCardItem = mapCardTemplate.content.querySelector('.map__card');

  // Функция перевода типа жилья на RU
  var getPropertyType = function (type) {
    var propertyTypes = {
      'palace': 'Дворец',
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    };

    return propertyTypes[type];
  };

  // Создание 1 карточки объявления
  function createCardItem(data) {
    var advertElement = mapCardItem.cloneNode(true);

    // Функция проверки блока на существование данных и их добавление
    // element - путь к элементу (advertElement.querySelector('.popup__title')), info - путь к данным массива, render _функц с данными в зав от их типа
    function createDataCardItem(element, info, render) {
      if (info) {
        render();
      } else {
        element.style.display = 'none';
      }
    }

    var title = data.offer.title;
    var popupTitleElement = advertElement.querySelector('.popup__title');
    var titleRender = function () {
      popupTitleElement.textContent = title;
    };
    createDataCardItem(popupTitleElement, title, titleRender);

    var address = data.offer.address;
    var popupAddressElement = advertElement.querySelector('.popup__text--address');
    var addressRender = function () {
      popupAddressElement.textContent = address;
    };
    createDataCardItem(popupAddressElement, address, addressRender);

    var price = data.offer.price;
    var popupPriceElement = advertElement.querySelector('.popup__text--price');
    var priceRender = function () {
      popupPriceElement.textContent = price + '₽/ночь';
    };
    createDataCardItem(popupPriceElement, price, priceRender);

    var capacity = data.offer.rooms;
    var popupCapacityElement = advertElement.querySelector('.popup__text--capacity');
    var capacityRender = function () {
      popupCapacityElement.textContent = capacity + ' комнаты для ' + data.offer.guests + ' гостей';
    };
    createDataCardItem(popupCapacityElement, capacity, capacityRender);

    var time = data.offer.checkin;
    var popupTimeElement = advertElement.querySelector('.popup__text--time');
    var timeRender = function () {
      popupTimeElement.textContent = 'Заезд после ' + time + ', выезд до ' + data.offer.checkout;
    };
    createDataCardItem(popupTimeElement, time, timeRender);

    var features = data.offer.features;
    var popupFeaturesElement = advertElement.querySelector('.popup__features');
    var featuresRender = function () {
      popupFeaturesElement.textContent = features.join(', ');
    };
    createDataCardItem(popupFeaturesElement, features, featuresRender);

    var description = data.offer.description;
    var popupDescriptionElement = advertElement.querySelector('.popup__description');
    var descriptionRender = function () {
      popupDescriptionElement.textContent = description;
    };
    createDataCardItem(popupDescriptionElement, description, descriptionRender);

    var avatar = data.author.avatar;
    var popupAvatarElement = advertElement.querySelector('.popup__avatar');
    var avatarRender = function () {
      popupAvatarElement.src = avatar;
    };
    createDataCardItem(popupAvatarElement, avatar, avatarRender);

    // Отображение переведенного на RU типа жилья в карточке
    var type = data.offer.type;
    var propertyType = getPropertyType(type);
    var popupTypeElement = advertElement.querySelector('.popup__type');
    var typeRender = function () {
      popupTypeElement.textContent = propertyType;
    };
    createDataCardItem(popupTypeElement, propertyType, typeRender);

    // Отображаем фотографии из массива photos(удаляем пустой шаблон)
    var photos = data.offer.photos;
    var popupPhotos = advertElement.querySelector('.popup__photos');
    var popupPhotosImageTemplate = popupPhotos.querySelector('img');
    popupPhotosImageTemplate.remove();

    var photosRender = function () {
      for (var i = 0; i < data.offer.photos.length; i++) {
        var popupPhotosImage = popupPhotosImageTemplate.cloneNode(true);
        popupPhotosImage.src = data.offer.photos[i];
        popupPhotos.appendChild(popupPhotosImage);
      }
    };
    createDataCardItem(popupPhotos, photos, photosRender);

    return advertElement;
  }

  window.card = {
    createCardItem: createCardItem
  };

})();
