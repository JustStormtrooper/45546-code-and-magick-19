'use strict';

(function () {
  var wizardColorState = {
    currentCoatColorIndex: 0,
    currentEyesColorIndex: 0,
    currentFireballColorIndex: 0,
  };

  var setup = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  var setupElement = document.querySelector('.setup');
  var setupWizardElement = setupElement.querySelector('.setup-wizard');
  var wizardCoatElement = setupWizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = setupWizardElement.querySelector('.wizard-eyes');
  var wizardFireballElement = document.querySelector('.setup-fireball-wrap');

  function getNextItem(array, wizardState, wizardStateItem) {
    var nextItemIndex = ++wizardState[wizardStateItem] % array.length;
    wizardState[wizardStateItem] = nextItemIndex;
    return array[nextItemIndex];
  }

  wizardCoatElement.addEventListener('click', function () {
    var colorValue = getNextItem(window.colors.COAT_COLORS, wizardColorState, 'currentCoatColorIndex');
    wizardCoatElement.style.fill = colorValue;
    setupElement.querySelector('input[name=coat-color]').value = colorValue;
    setup.onCoatChange(colorValue);
  });

  wizardEyesElement.addEventListener('click', function () {
    var colorValue = getNextItem(window.colors.EYES_COLORS, wizardColorState, 'currentEyesColorIndex');
    wizardEyesElement.style.fill = colorValue;
    setupElement.querySelector('input[name=eyes-color]').value = colorValue;
    setup.onEyesChange(colorValue);
  });

  wizardFireballElement.addEventListener('click', function () {
    var colorValue = getNextItem(window.colors.FIREBALL_COLORS, wizardColorState, 'currentFireballColorIndex');
    wizardFireballElement.style.background = colorValue;
    wizardFireballElement.querySelector('input[name=fireball-color]').value = colorValue;
  });

  window.setup = setup;

})();
