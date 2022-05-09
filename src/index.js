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

        const textarea = mainClass.addTextarea('area');
        const keyboardWrapper = mainClass.addKeyboardWrapper('keyboard-wrapper');
        const info = mainClass.addInfo('The keyboard is created in Windows OS', 
        'Switch language: left shift + left alt');

        this.allKeys = this.keysClass.createKeys(dictionaryClasses);
        this.keysClass.fillKeys(dictionaryEn, this.allKeys);

        keyboardWrapper.append(...this.allKeys);
        main.append(textarea, keyboardWrapper, info);
        wrapper.append(header, main, footer);

        return wrapper;
    }
}

const contentClass = new MainClass();
document.body.append(contentClass.createContent());

class SwitchLanguageClass {
    constructor() {
        this.currLanguage = 'en';

        this.firstButton = null;
        this.secondButton = null;
    }

    switchFunc(eventCode, code) {
        if(eventCode === code) {
            if (this.currLanguage === 'en') {
                contentClass.keysClass.fillKeys(dictionaryRu, contentClass.allKeys);
                this.currLanguage = 'ru';
            } else {
                contentClass.keysClass.fillKeys(dictionaryEn, contentClass.allKeys);
                this.currLanguage = 'en';
            }
            this.firstButton = null;
            this.secondButton = null;
        } else {
            this.firstButton = null;
            this.secondButton = null;
        }
    }

    switchLanguage(event, stop) {
        if (stop) {
            this.firstButton = null;
            this.secondButton = null;
            return;
        }
        if (!this.firstButton) {
            this.firstButton = event.code;
        } else {
            if (this.firstButton === 'ControlLeft') {
                this.switchFunc(event.code, 'AltLeft');
            }
            if (this.firstButton === 'AltLeft') {
                this.switchFunc(event.code, 'ControlLeft');
            }
        }
    }
}

const lang = new SwitchLanguageClass();

class switchCaps {
    constructor() {
        this.currStatus = true;
    }

    switcher() {
        if (this.currStatus) {

            if (lang.currLanguage === 'en') {
                contentClass.keysClass.fillKeys(capsLockEn, contentClass.allKeys);
                lang.currLanguage = 'capsLockEn';
                return;
            }
            if (lang.currLanguage === 'ru') {
                contentClass.keysClass.fillKeys(capsLockRu, contentClass.allKeys);
                lang.currLanguage = 'capsLockRu';
                return;
            }

            if (lang.currLanguage === 'capsLockEn') {
                contentClass.keysClass.fillKeys(dictionaryEn, contentClass.allKeys);
                lang.currLanguage = 'en';
                return;
            }
            
            if (lang.currLanguage === 'capsLockRu') {
                contentClass.keysClass.fillKeys(dictionaryRu, contentClass.allKeys);
                lang.currLanguage = 'ru';
                return;
            }
        }
    }
}

const capsSwitcher = new switchCaps();

document.addEventListener('keydown', (event) => {
    const key = event.code;

    if (!dictionaryClasses.includes(key)) {
        return
    };

    const index = dictionaryClasses.indexOf(key);
    contentClass.allKeys[index].classList.add('active');

    lang.switchLanguage(event);

    if (key === 'ShiftLeft' || key === 'ShiftRight') {
        if (lang.currLanguage === 'en') {
            contentClass.keysClass.fillKeys(dictionaryEnShift, contentClass.allKeys);
        } else if (lang.currLanguage === 'ru') {
            contentClass.keysClass.fillKeys(dictionaryRuShift, contentClass.allKeys);
        } else if (lang.currLanguage === 'capsLockEn') {
            contentClass.keysClass.fillKeys(capsLockEnShift, contentClass.allKeys);
        } else if (lang.currLanguage === 'capsLockRu') {
            contentClass.keysClass.fillKeys(capsLockRuShift, contentClass.allKeys);
        }
    }

    if (key === 'CapsLock') {
        capsSwitcher.switcher();
        capsSwitcher.currStatus = 0;
    }
})

document.addEventListener('keyup', (event) => {
    let key = event.code;

    if (!dictionaryClasses.includes(key)) {
        return
    };

    const index = dictionaryClasses.indexOf(key);

    contentClass.allKeys[index].classList.remove('active');

    lang.switchLanguage(null, true);

    if (key === 'ShiftLeft' || key === 'ShiftRight') {
        if (lang.currLanguage === 'en') {
            contentClass.keysClass.fillKeys(dictionaryEn, contentClass.allKeys);
        } else if (lang.currLanguage === 'ru') {
            contentClass.keysClass.fillKeys(dictionaryRu, contentClass.allKeys);
        } else if (lang.currLanguage === 'capsLockEn') {
            contentClass.keysClass.fillKeys(capsLockEn, contentClass.allKeys);
        } else if (lang.currLanguage === 'capsLockRu') {
            contentClass.keysClass.fillKeys(capsLockRu, contentClass.allKeys);
        }
    }

    if (key === 'CapsLock') {
        capsSwitcher.currStatus = 1;
    }
})