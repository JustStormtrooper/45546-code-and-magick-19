'use strict';

(function () {
  var NUM_PERSONS = 4;

  var setupSimilarElement = document.querySelector('.setup-similar');
  var setupSimilarListElement = setupSimilarElement.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  function renderPerson(person) {
    var personElement = similarWizardTemplate.cloneNode(true);

    personElement.querySelector('.setup-similar-label').textContent = person.name;
    personElement.querySelector('.wizard-coat').style.fill = person.colorCoat;
    personElement.querySelector('.wizard-eyes').style.fill = person.colorEyes;

    return personElement;
  }

  function addPersonsToDOM(persons) {
    var fragment = document.createDocumentFragment();
    setupSimilarListElement.innerHTML = '';
    for (var i = 0; i < NUM_PERSONS; i++) {
      fragment.appendChild(renderPerson(persons[i]));
    }

    setupSimilarListElement.appendChild(fragment);
  }

  function showSimilarSetup() {
    setupSimilarElement.classList.remove('hidden');
  }

  window.data = {
    showSimilarSetup: showSimilarSetup,
    addPersonsToDOM: addPersonsToDOM
  };

})();
