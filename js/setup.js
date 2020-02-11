'use strict';

var PERSON_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var PERSON_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var NUM_PERSONS = 4;

var setupSimilarElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

function showSetup() {
  document.querySelector('.setup').classList.remove('hidden');
}

function generatePersons() {
  var persons = [];

  for (var i = 0; i < NUM_PERSONS; i++) {
    var person = {};

    person.name = PERSON_FIRST_NAMES[Math.floor(Math.random() * PERSON_FIRST_NAMES.length)] + ' ' +
                  PERSON_SECOND_NAMES[Math.floor(Math.random() * PERSON_SECOND_NAMES.length)];
    person.coatColor = COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)];
    person.eyesColor = EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)];

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

function showSimilarSetup() {
  document.querySelector('.setup-similar').classList.remove('hidden');
}

function init() {
  showSetup();
  var persons = generatePersons();
  addPersonsToDOM(persons);
  showSimilarSetup();
}

init();
