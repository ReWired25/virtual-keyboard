import createWrapper from './modules/wrapper/wrapper';
import createHeader from './modules/header/header';
import createMain from './modules/main/main';
import createFooter from './modules/footer/footer';
import Keys from './modules/keys-and-functions/keys';
import { dictionaryClasses, dictionaryEn, dictionaryRu } from './modules/keys-and-functions/keyDictionary';
import './style.scss';

class mainClass {
    constructor() {
        this.allKeys = null;
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

        const keysClass = new Keys();
        this.allKeys = keysClass.createKeys(dictionaryClasses);
        keysClass.fillKeys(dictionaryEn, this.allKeys);

        keyboardWrapper.append(...this.allKeys);
        main.append(textarea, keyboardWrapper, info);
        wrapper.append(header, main, footer);

        return wrapper;
    }
}

const contentClass = new mainClass();
document.body.append(contentClass.createContent());

console.log(contentClass.allKeys);

document.addEventListener('keyup', (event) => {

})