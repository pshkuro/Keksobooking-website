'use strict';

// Модуль устранения 'дребезга'
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  function debounce(act) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        act.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.debounce = {
    debounce: debounce
  };

})();
