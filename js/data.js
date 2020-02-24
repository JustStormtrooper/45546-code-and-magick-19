'use strict';

(function () {
  var PERSON_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var PERSON_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var NUM_PERSONS = 4;

  var setupSimilarElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  function generatePersons() {
    var persons = [];

    for (var i = 0; i < NUM_PERSONS; i++) {
      var person = {};

      person.name = getRandomItem(PERSON_FIRST_NAMES) + ' ' + getRandomItem(PERSON_SECOND_NAMES);
      person.coatColor = getRandomItem(window.colors.COAT_COLORS);
      person.eyesColor = getRandomItem(window.colors.EYES_COLORS);

      persons.push(person);
    }

    return persons;
  }

  function renderPerson(person) {
    var personElement = similarWizardTemplate.cloneNode(true);

    personElement.querySelector('.setup-similar-label').textContent = person.name;
    personElement.querySelector('.wizard-coat').style.fill = person.coatColor;
    personElement.querySelector('.wizard-eyes').style.fill = person.eyesColor;

    return personElement;
  }

  function addPersonsToDOM(persons) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < NUM_PERSONS; i++) {
      fragment.appendChild(renderPerson(persons[i]));
    }

    setupSimilarElement.appendChild(fragment);
  }

  function getRandomItem(array) {
    var randomItemIndex = Math.floor(Math.random() * array.length);
    return array[randomItemIndex];
  }

  function showSimilarSetup() {
    var persons = generatePersons();
    addPersonsToDOM(persons);
    document.querySelector('.setup-similar').classList.remove('hidden');
  }

  window.data = {
    showSimilarSetup: showSimilarSetup
  };

})();
