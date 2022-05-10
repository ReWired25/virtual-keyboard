import СreateWrapper from './modules/wrapper/wrapper';
import CreateHeader from './modules/header/header';
import CreateMain from './modules/main/main';
import CreateFooter from './modules/footer/footer';
import Keys from './modules/keys-and-functions/keys';
import { dictionaryClasses, dictionaryEn } from './modules/keys-and-functions/keyDictionary';

class MainClass {
  constructor() {
    this.allKeys = null;
    this.keysClass = new Keys();
    this.textarea = null;
  }

  createContent() {
    const wrapperClass = new СreateWrapper();
    const wrapper = wrapperClass.addWrapper();

    const headerClass = new CreateHeader();
    const header = headerClass.addHeader('Virtual Keyboard');

    const footerClass = new CreateFooter();
    const footer = footerClass.addFooter('ReWired25', 'https://github.com/ReWired25');

    const mainClass = new CreateMain();
    const main = mainClass.addMain('main');

    this.textarea = mainClass.addTextarea('area');
    this.textarea.setAttribute('autofocus', 'autofocus');
    const keyboardWrapper = mainClass.addKeyboardWrapper('keyboard-wrapper');
    const info = mainClass.addInfo(
      'The keyboard is created in Windows OS',
      'Switch language: left shift + left alt',
    );

    this.allKeys = this.keysClass.createKeys(dictionaryClasses);
    this.keysClass.fillKeys(dictionaryEn, this.allKeys);

    keyboardWrapper.append(...this.allKeys);
    main.append(this.textarea, keyboardWrapper, info);
    wrapper.append(header, main, footer);

    return wrapper;
  }
}

const contentClass = new MainClass();

export default contentClass;
