'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var URL_SAVE = 'https://js.dump.academy/code-and-magick';

  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText + '(URL: ' + xhr.responseURL + ')');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания ответа от сервера.');
    });

    xhr.open('GET', URL_LOAD);
    xhr.send();
  }

  function save(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError('Данные не отправлены. Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText + '(URL: ' + xhr.responseURL + ')');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания данных сервером.');
    });

    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  }

  function showErrorMessage(errorMsg) {
    var node = document.querySelector('.setup-similar-list + div');
    if (node === null) {
      node = document.createElement('div');
      node.style = 'margin: 0px 40px; padding: 10px 0; text-align: center;';
      node.style.fontSize = '20px';
      node.style.color = '#fff';
      node.style.backgroundColor = '#f44336';
      node.textContent = errorMsg;
    } else {
      node.textContent = errorMsg;
      node.style.backgroundColor = '#e02d1f';
      setTimeout(function () {
        node.style.backgroundColor = '#f44336';
      }, 500);
    }
    document.querySelector('.setup-similar-list').insertAdjacentElement('afterend', node);
  }

  window.backend = {
    load: load,
    save: save,
    showErrorMessage: showErrorMessage
  };

})();
