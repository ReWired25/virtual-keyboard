import {
  dictionaryEn, dictionaryRu, capsLockEn, capsLockRu, capsLockEnShift, capsLockRuShift,
} from './modules/keys-and-functions/keyDictionary';
import contentClass from './baseFunc';

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
    this.currLanguage = newLang;
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

export default lang;
