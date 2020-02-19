'use strict';

var PERSON_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var PERSON_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var NUM_PERSONS = 4;

var wizardColorState = {
  currentCoatColorIndex: 0,
  currentEyesColorIndex: 0,
  currentFireballColorIndex: 0,
};

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

    person.name = getRandomItem(PERSON_FIRST_NAMES) + ' ' + getRandomItem(PERSON_SECOND_NAMES);
    person.coatColor = getRandomItem(COAT_COLORS);
    person.eyesColor = getRandomItem(EYES_COLORS);

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
  return array[randomItemIndex];
}

function getNextItem(array, wizardState, wizardStateItem) {
  var nextItemIndex = ++wizardState[wizardStateItem] % array.length;
  wizardState[wizardStateItem] = nextItemIndex;
  return array[nextItemIndex];
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
  var colorValue = getNextItem(COAT_COLORS, wizardColorState, 'currentCoatColorIndex');
  wizardCoatElement.style.fill = colorValue;
  setupElement.querySelector('input[name=coat-color]').value = colorValue;
});

wizardEyesElement.addEventListener('click', function () {
  var colorValue = getNextItem(EYES_COLORS, wizardColorState, 'currentEyesColorIndex');
  wizardEyesElement.style.fill = colorValue;
  setupElement.querySelector('input[name=eyes-color]').value = colorValue;
});

wizardFireballElement.addEventListener('click', function () {
  var colorValue = getNextItem(FIREBALL_COLORS, wizardColorState, 'currentFireballColorIndex');
  wizardFireballElement.style.background = colorValue;
  wizardFireballElement.querySelector('input[name=fireball-color]').value = colorValue;
});

init();
