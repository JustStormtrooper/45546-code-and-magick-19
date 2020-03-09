'use strict';

(function () {
  var wizards = [];
  var coatColor;
  var eyesColor;

  function updateSimilarWizards() {
    window.data.addPersonsToDOM(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  }

  function getRank(wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  }

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  function onSuccessLoad(data) {
    wizards = data;
    updateSimilarWizards();
  }

  window.setup.onEyesChange = function (color) {
    eyesColor = color;
    window.utils.debounce(updateSimilarWizards);
  };

  window.setup.onCoatChange = function (color) {
    coatColor = color;
    window.utils.debounce(updateSimilarWizards);
  };

  window.backend.load(onSuccessLoad);

})();
