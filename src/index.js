import createWrapper from './modules/wrapper/wrapper';
import createHeader from './modules/header/header';
import createMain from './modules/main/main';
import createFooter from './modules/footer/footer';
import Keys from './modules/keys-and-functions/keys';
import { dictionaryClasses, dictionaryEn, dictionaryRu, dictionaryEnShift, dictionaryRuShift, capsLockEn, capsLockRu, capsLockEnShift, capsLockRuShift } from './modules/keys-and-functions/keyDictionary';
import './style.scss';

class MainClass {
    constructor() {
        this.allKeys = null;
        this.keysClass = new Keys();
        this.textarea = null;
    }

    createContent() {
        const wrapperClass = new createWrapper();
        const wrapper = wrapperClass.addWrapper();

        const headerClass = new createHeader();
        const header = headerClass.addHeader('Virtual Keyboard');

        const footerClass = new createFooter();
        const footer = footerClass.addFooter('ReWired25', 'https://github.com/ReWired25');

        const mainClass = new createMain();
        const main = mainClass.addMain('main');

        this.textarea = mainClass.addTextarea('area');
        this.textarea.setAttribute('autofocus', 'autofocus');
        const keyboardWrapper = mainClass.addKeyboardWrapper('keyboard-wrapper');
        const info = mainClass.addInfo('The keyboard is created in Windows OS', 
        'Switch language: left shift + left alt');

        this.allKeys = this.keysClass.createKeys(dictionaryClasses);
        this.keysClass.fillKeys(dictionaryEn, this.allKeys);

        keyboardWrapper.append(...this.allKeys);
        main.append(this.textarea, keyboardWrapper, info);
        wrapper.append(header, main, footer);

        return wrapper;
    }
}

const contentClass = new MainClass();
document.body.append(contentClass.createContent());
contentClass.textarea.onblur = () => {
    contentClass.textarea.focus();
}

class SwitchLanguageClass {
    constructor() {
        this.currLanguage = 'en';

        this.firstButton = null;
        this.secondButton = null;
        this.currCtrl = null;
        this.currAlt = null;
    }

    dictionarySwitcher(newDict, newLang) {
        contentClass.keysClass.fillKeys(newDict, contentClass.allKeys);
        lang.currLanguage = newLang;
    }

    switchFunc() {
        if (this.currLanguage === 'en') {
            this.dictionarySwitcher(dictionaryRu, 'ru');
        } else if (this.currLanguage === 'ru') {
            this.dictionarySwitcher(dictionaryEn, 'en');
        } else if (this.currLanguage === 'capsLockEn') {
            this.dictionarySwitcher(capsLockRu, 'capsLockRu');
        } else if (this.currLanguage === 'capsLockRu') {
            this.dictionarySwitcher(capsLockEn, 'capsLockEn');
        } else if (this.currLanguage === 'capsLockEnShift') {
            this.dictionarySwitcher(capsLockRuShift, 'capsLockRuShift');
        } else if (this.currLanguage === 'capsLockRuShift') {
            this.dictionarySwitcher(capsLockEnShift, 'capsLockEnShift');
        }
    }

    switchLanguage(event, isUp) {
        if (isUp) {
            if (event.code === 'ControlLeft') {
                this.currCtrl = null;
            } else if (event.code === 'AltLeft') {
                this.currAlt = null;
            }
            return;
        }

        if (event.code === 'ControlLeft') {
            this.currCtrl = true;
        } else if (event.code === 'AltLeft') {
            this.currAlt = true;
        }
        if (this.currCtrl && this.currAlt) {
            this.switchFunc();
        }
    }
}

const lang = new SwitchLanguageClass();

class switchCaps {
    constructor() {
        this.currStatus = true;
        this.shiftStatus = false;
    }

    switcher() {
        if (this.currStatus) {
            if (this.shiftStatus) {
                if (lang.currLanguage === 'enShift') {
                    lang.dictionarySwitcher(capsLockEnShift, 'capsLockEnShift');
                } else if (lang.currLanguage === 'ruShift') {
                    lang.dictionarySwitcher(capsLockRuShift, 'capsLockRuShift');
                } else if (lang.currLanguage === 'capsLockEnShift') {
                    lang.dictionarySwitcher(dictionaryEnShift, 'enShift');
                } else if (lang.currLanguage === 'capsLockRuShift') {
                    lang.dictionarySwitcher(dictionaryRuShift, 'ruShift');
                }
            } else {
                if (lang.currLanguage === 'en') {
                    lang.dictionarySwitcher(capsLockEn, 'capsLockEn');
                } else if (lang.currLanguage === 'ru') {
                    lang.dictionarySwitcher(capsLockRu, 'capsLockRu');
                } else if (lang.currLanguage === 'capsLockEn') {
                    lang.dictionarySwitcher(dictionaryEn, 'en');
                } else if (lang.currLanguage === 'capsLockRu') {
                    lang.dictionarySwitcher(dictionaryRu, 'ru');
                }
            }
        }
    }
}

const capsSwitcher = new switchCaps();

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    const key = event.code;

    if (!dictionaryClasses.includes(key)) {
        return
    };

    const index = dictionaryClasses.indexOf(key);
    contentClass.allKeys[index].classList.add('active');

    lang.switchLanguage(event);

    if (key === 'ShiftLeft' || key === 'ShiftRight') {
        if (lang.currLanguage === 'en') {
            lang.dictionarySwitcher(dictionaryEnShift, 'enShift');
        } else if (lang.currLanguage === 'ru') {
            lang.dictionarySwitcher(dictionaryRuShift, 'ruShift');
        } else if (lang.currLanguage === 'capsLockEn') {
            lang.dictionarySwitcher(capsLockEnShift, 'capsLockEnShift');
        } else if (lang.currLanguage === 'capsLockRu') {
            lang.dictionarySwitcher(capsLockRuShift, 'capsLockRuShift');
        }
        capsSwitcher.shiftStatus = true;
    }

    if (key === 'CapsLock') {
        capsSwitcher.switcher();
        capsSwitcher.currStatus = false;
    }

    const selectStart = contentClass.textarea.selectionStart;
    const selectEnd = contentClass.textarea.selectionEnd;
    const returnKeys = ['MetaLeft', 'CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlAlt', 'AltLeft', 'AltRight', 'Del'];

    if (returnKeys.includes(key)) {
        return;
    } else if (key === 'Space') {
        contentClass.textarea.setRangeText(' ', selectStart, selectEnd, 'end');
    } else if (key === 'Tab') {
        contentClass.textarea.setRangeText('    ', selectStart, selectEnd, 'end');
    } else if (key === 'Backspace') {
        if (selectStart === 0 && selectEnd - selectStart <= 0) {
            return;
        } else if (selectEnd - selectStart > 0) {
            contentClass.textarea.setRangeText('', selectStart, selectEnd, 'end');
        } else {
            contentClass.textarea.setRangeText('', selectStart - 1, selectEnd, 'end');
        }
    } else if (key === 'Delete') {
        contentClass.textarea.setRangeText('', selectStart, selectEnd + 1, 'end');
    } else if (key === 'Enter') {
        contentClass.textarea.setRangeText('\n', selectStart, selectEnd, 'end');
    }
    else {
        contentClass.textarea.setRangeText(contentClass.allKeys[index].innerHTML, selectStart, selectEnd, 'end');
    }
})

class createMouseListeners {
    constructor() {
        this.returnKeys = ['Win', 'Ctrl', 'Ctrl', 'Alt', 'Alt'];
    }

    createListeners() {
        let keys = contentClass.allKeys;

        for (let element of keys) {
            if (this.returnKeys.includes(element.innerHTML)) {
                continue;
            } else if (element.innerHTML === 'Shift') {
                element.onmousedown = () => {
                    if (lang.currLanguage === 'en') {
                        lang.dictionarySwitcher(dictionaryEnShift, 'enShift');
                    } else if (lang.currLanguage === 'ru') {
                        lang.dictionarySwitcher(dictionaryRuShift, 'ruShift');
                    } else if (lang.currLanguage === 'capsLockEn') {
                        lang.dictionarySwitcher(capsLockEnShift, 'capsLockEnShift');
                    } else if (lang.currLanguage === 'capsLockRu') {
                        lang.dictionarySwitcher(capsLockRuShift, 'capsLockRuShift');
                    }
                    element.classList.add('active');
                    capsSwitcher.shiftStatus = true;
                }
                element.onmouseup = () => {
                    if (lang.currLanguage === 'enShift') {
                        lang.dictionarySwitcher(dictionaryEn, 'en');
                    } else if (lang.currLanguage === 'ruShift') {
                        lang.dictionarySwitcher(dictionaryRu, 'ru');
                    } else if (lang.currLanguage === 'capsLockEnShift') {
                        lang.dictionarySwitcher(capsLockEn, 'capsLockEn');
                    } else if (lang.currLanguage === 'capsLockRuShift') {
                        lang.dictionarySwitcher(capsLockRu, 'capsLockRu');
                    }
                    element.classList.remove('active');
                    capsSwitcher.shiftStatus = false;
                }
            } else if (element.innerHTML === 'Caps Lock') {
                element.onmousedown = () => {
                    capsSwitcher.switcher();
                    capsSwitcher.currStatus = false;
                }
                element.onmouseup = () => {
                    capsSwitcher.currStatus = true;
                }
            } else if (element.classList.contains('Tab')) {
                element.onclick = () => contentClass.textarea.setRangeText('    ', contentClass.textarea.selectionStart, contentClass.textarea.selectionEnd, 'end');
            } else if (element.classList.contains('Space')) {
                element.onclick = () => contentClass.textarea.setRangeText(' ', contentClass.textarea.selectionStart, contentClass.textarea.selectionEnd, 'end');
            } else if (element.classList.contains('Backspace')) {
                element.onclick = () => {
                    if (contentClass.textarea.selectionStart === 0 && contentClass.textarea.selectionEnd - contentClass.textarea.selectionStart <= 0) {
                        return;
                    } else if (contentClass.textarea.selectionEnd - contentClass.textarea.selectionStart > 0) {
                        contentClass.textarea.setRangeText('', contentClass.textarea.selectionStart, contentClass.textarea.selectionEnd, 'end');
                    } else {
                        contentClass.textarea.setRangeText('', contentClass.textarea.selectionStart - 1, contentClass.textarea.selectionEnd, 'end');
                    }
                }
            } else if (element.classList.contains('Delete')) {
                element.onclick = () => contentClass.textarea.setRangeText('', contentClass.textarea.selectionStart, contentClass.textarea.selectionEnd + 1, 'end');
            } else if (element.classList.contains('Enter')) {
                element.onclick = () => contentClass.textarea.setRangeText('\n', contentClass.textarea.selectionStart, contentClass.textarea.selectionEnd, 'end');
            } else {
                element.onclick = () => contentClass.textarea.setRangeText(element.innerHTML, contentClass.textarea.selectionStart, contentClass.textarea.selectionEnd, 'end');
            }
        }
    }
}

const mouseEvents = new createMouseListeners();
mouseEvents.createListeners()

document.addEventListener('keyup', (event) => {
    let key = event.code;

    if (!dictionaryClasses.includes(key)) {
        return
    };

    const index = dictionaryClasses.indexOf(key);

    contentClass.allKeys[index].classList.remove('active');

    lang.switchLanguage(event, true);

    if (key === 'ShiftLeft' || key === 'ShiftRight') {
        if (lang.currLanguage === 'enShift') {
            lang.dictionarySwitcher(dictionaryEn, 'en');
        } else if (lang.currLanguage === 'ruShift') {
            lang.dictionarySwitcher(dictionaryRu, 'ru');
        } else if (lang.currLanguage === 'capsLockEnShift') {
            lang.dictionarySwitcher(capsLockEn, 'capsLockEn');
        } else if (lang.currLanguage === 'capsLockRuShift') {
            lang.dictionarySwitcher(capsLockRu, 'capsLockRu');
        }

        capsSwitcher.shiftStatus = false;
    }

    if (key === 'CapsLock') {
        capsSwitcher.currStatus = true;
    }
})