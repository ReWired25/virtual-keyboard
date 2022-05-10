import {
  dictionaryEn, dictionaryRu, dictionaryEnShift,
  dictionaryRuShift, capsLockEn, capsLockRu, capsLockEnShift, capsLockRuShift,
} from './modules/keys-and-functions/keyDictionary';
import lang from './language';

export default class SwitchCaps {
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
      } else if (lang.currLanguage === 'en') {
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
