'use strict';

var PERSON_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var PERSON_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var NUM_PERSONS = 4;

var currentCoatColorIndex = 0;
var currentEyesColorIndex = 0;
var currentFireballColorIndex = 0;

var setupSimilarElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupElement = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = setupElement.querySelector('.setup-close');
var setupWizardElement = setupElement.querySelector('.setup-wizard');
var wizardCoatElement = setupWizardElement.querySelector('.wizard-coat');
var wizardEyesElement = setupWizardElement.querySelector('.wizard-eyes');
var wizardFireballElement = document.querySelector('.setup-fireball-wrap');

function showSetup() {
  setupElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
}

function closeSetup() {
  setupElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
}

function onPopupEscPress(evt) {
  if (evt.key === 'Escape' && evt.target.type !== 'text') {
    closeSetup();
  }
}

function generatePersons() {
  var persons = [];

  for (var i = 0; i < NUM_PERSONS; i++) {
    var person = {};

    person.name = PERSON_FIRST_NAMES[Math.floor(Math.random() * PERSON_FIRST_NAMES.length)] + ' ' +
                  PERSON_SECOND_NAMES[Math.floor(Math.random() * PERSON_SECOND_NAMES.length)];
    person.coatColor = COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)];
    person.eyesColor = getRandomItem(EYES_COLORS)[1];

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

function getRandomItem(array) {
  var randomItemIndex = Math.floor(Math.random() * array.length);
  return [randomItemIndex, array[randomItemIndex]];
}

function getNextItem(array, currentItemIndex) {
  var nextItemIndex = ++currentItemIndex % array.length;
  return [nextItemIndex, array[nextItemIndex]];
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

wizardCoatElement.addEventListener('click', function () {
  var values = getNextItem(COAT_COLORS, currentCoatColorIndex);
  currentCoatColorIndex = values[0];
  wizardCoatElement.style.fill = values[1];
  setupElement.querySelector('input[name=coat-color]').value = values[1];
});

wizardEyesElement.addEventListener('click', function () {
  var values = getNextItem(EYES_COLORS, currentEyesColorIndex);
  currentEyesColorIndex = values[0];
  wizardEyesElement.style.fill = values[1];
  setupElement.querySelector('input[name=eyes-color]').value = values[1];
});

wizardFireballElement.addEventListener('click', function () {
  var values = getNextItem(FIREBALL_COLORS, currentFireballColorIndex);
  currentFireballColorIndex = values[0];
  wizardFireballElement.style.background = values[1];
  wizardFireballElement.querySelector('input[name=fireball-color]').value = values[1];
});

init();
