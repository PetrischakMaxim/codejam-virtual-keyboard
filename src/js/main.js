'use strict';

/* Key codes */
const keyCodes = {
    ru: [
        'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
        'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'delete',
        'capslock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
        'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'rshift',
        'win', 'alt', 'space', 'ctrl', 'home', '←', '↓', '→',
    ],
    en: [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
        'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'delete',
        'capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
        'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'rshift',
        'win', 'alt', 'space', 'ctrl', 'home', '←', '↓', '→',
    ],
}

//document.documentElement.lang === 'ru'

/* Create keyboard */
function generateButtons(lang) {
    const keymap = keyCodes[lang];
    const keyButtonContainer = new DocumentFragment();
    keymap.map(key => {
        const keyButton = document.createElement('button');
        keyButton.classList.add('keyboard-list__button');
        keyButton.dataset.keyCode = key;
        keyButton.textContent = key;
        keyButtonContainer.append(keyButton);
    });
    return keyButtonContainer;
}
function createKeyboard() {

    const keyboard = document.createElement('form');
    const keyboarWrapper = document.createElement('div');
    const textAreaWrapper = document.createElement('fieldset');
    const textArea = document.createElement('textarea');

    keyboard.classList.add('keyboard');
    keyboarWrapper.classList.add('keyboard-list');

    textAreaWrapper.append(textArea);
    keyboarWrapper.append(generateButtons('en'));
    keyboard.append(textAreaWrapper, keyboarWrapper);
    return keyboard;
}

/* switch lang */
function switchLang(lang) {
    return generateButtons(lang);
}

/* Render keyboard */
function renderContent() {
    const pageKeyboard = createKeyboard();
    document.body.append(pageKeyboard);
}

/* Call render function */
document.addEventListener("DOMContentLoaded", renderContent);

/* When loading the DOM, declare the variables and work with them */
window.addEventListener('load', () => {
    const keyboard = document.querySelector('.keyboard');
    const keyboardDisplay = keyboard.querySelector('textarea');
    const keyboardButtonsContainer = keyboard.querySelector('.keyboard-list');
    const keyboardButtons = keyboardButtonsContainer.querySelectorAll('.keyboard-list__button');
    let textAreaStorage = '';

    keyboardButtons.forEach(button => {
        button.addEventListener('click', (evt) => {
            evt.preventDefault();
            const buttonValue = button.textContent;
            textAreaStorage += buttonValue;
            keyboardDisplay.textContent = textAreaStorage;
        });
        button.addEventListener('transitionend', ()=> button.blur());
    });

    document.addEventListener('keydown',(evt)=>{
        const key = evt.key;
        keyboardButtons.forEach(button => {
            if(button.dataset.keyCode === key) {
                button.focus();
                button.click();
            }
        });
    });

    document.addEventListener('keyup', (evt) => {
        const key = evt.key;
        keyboardButtons.forEach(button => {
            if (button.dataset.keyCode === key) {
                button.blur();
            }
        });
    });

});

