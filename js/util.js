'use strict';

(function () {
  // Функция Блокировки и Разблокировки полей формы
  function setDisabledFormFields(form, disabled) {
    var formChildren = form.children;
    for (var i = 0; i < formChildren.length; i++) {
      formChildren[i].disabled = disabled;
    }
  }

  window.util = {
    setDisabledFormFields: setDisabledFormFields
  };
})();

