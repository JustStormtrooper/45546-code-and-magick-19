'use strict';

(function () {
  var SETUP_LEFT_DEFAULT = '50%';
  var SETUP_TOP_DEFAULT = '80px';

  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = setupElement.querySelector('.setup-close');
  var dialogHandler = setupElement.querySelector('.upload');

  function showSetup() {
    setupElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  }

  function closeSetup() {
    setupElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setupElement.style.left = SETUP_LEFT_DEFAULT;
    setupElement.style.top = SETUP_TOP_DEFAULT;
  }

  function onPopupEscPress(evt) {
    if (evt.key === 'Escape' && evt.target.type !== 'text') {
      closeSetup();
    }
  }

  setupOpenElement.addEventListener('click', function () {
    showSetup();
  });

  setupOpenElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      showSetup();
    }
  });

  setupCloseElement.addEventListener('click', function () {
    closeSetup();
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closeSetup();
    }
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupElement.style.top = (setupElement.offsetTop - shift.y) + 'px';
      setupElement.style.left = (setupElement.offsetLeft - shift.x) + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    }

    function onClickPreventDefault(clickEvt) {
      clickEvt.preventDefault();
      dialogHandler.removeEventListener('click', onClickPreventDefault);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.data.showSimilarSetup();

})();
