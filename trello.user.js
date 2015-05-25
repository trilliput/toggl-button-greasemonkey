// ==UserScript==
// @name        Toggl-Button Trello
// @namespace   https://github.com/jurgenhaas/toggl-button-greasemonkey
// @version     1.0
// @include     http*://trello.com/*
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_info
// @grant       GM_registerMenuCommand
// @require     https://greasyfork.org/scripts/2670-toggllibrary/code/TogglLibrary.js
// @resource    togglStyle https://raw.githubusercontent.com/jurgenhaas/toggl-button-greasemonkey/v1.1/TogglLibrary.css
// ==/UserScript==

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
    cardWindowSelector = '.window-wrapper',
    cardWindow = document.querySelector(cardWindowSelector),
    togglButton = null;

console.log('test');
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation.type);
    if (mutation.type === 'childList') {
      var cardDetailWindow = cardWindow.querySelector('.card-detail-window');
      if (cardDetailWindow !== null && !cardDetailWindow.classList.contains('toggl')) {
        togglButton = new TogglButtonGM('.card-detail-window', function (elem) {
          var descriptionElem = elem.querySelector('.card-detail-item-block'),
              container = elem.querySelector('.card-detail-item-toggl-button'),
              titleElem = elem.querySelector('.window-header .window-title-text');

          if (container === null) {
            // Create container for toggl button
            var container = document.createElement('div');
            container.className = 'card-detail-item card-detail-item-toggl-button clear';

            descriptionElem.parentNode.insertBefore(container, descriptionElem);
          }

          return {
            className: 'trello',
            description: titleElem.textContent.trim(),
            targetSelectors: {
              link: '.card-detail-item-toggl-button',
              projectSelect: '.card-detail-item-toggl-button',
            }
          };
        });
      }
    }
  });
});

observer.observe(cardWindow, {attributes: true, childList: true, characterData: true});

