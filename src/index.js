import {
  dictionaryClasses, dictionaryEn, dictionaryRu, dictionaryEnShift,
  dictionaryRuShift, capsLockEn, capsLockRu, capsLockEnShift, capsLockRuShift,
} from './modules/keys-and-functions/keyDictionary';
import SwitchCaps from './capslock';
import './style.scss';
import contentClass from './baseFunc';
import lang from './language';

document.body.append(contentClass.createContent());
contentClass.textarea.onblur = () => {
  contentClass.textarea.focus();
};

window.onload = () => {
  const currLanguage = localStorage.getItem('currLang');

  if (currLanguage) {
    if (currLanguage === 'en' || currLanguage === 'capsLockEn'
    || currLanguage === 'enShift' || currLanguage === 'capsLockEnShift') {
      lang.dictionarySwitcher(dictionaryEn, 'en');
    } else if (currLanguage === 'ru' || currLanguage === 'capsLockRu'
    || currLanguage === 'ruShift' || currLanguage === 'capsLockRuShift') {
      lang.dictionarySwitcher(dictionaryRu, 'ru');
    }
  }
};

const capsSwitcher = new SwitchCaps();

class CreateMouseListeners {
  constructor() {
    this.lintVariable = 0;
    this.returnKeys = ['Win', 'Alt', 'Ctrl'];
  }

  createListeners() {
    this.lintVariable += 1;

    const keys = contentClass.allKeys;

    keys.forEach((item) => {
      const element = item;
      if (this.returnKeys.includes(element.innerHTML)) {
        this.lintVariable += 1;
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
        };
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
        };
      } else if (element.innerHTML === 'Caps Lock') {
        element.onmousedown = () => {
          capsSwitcher.switcher();
          capsSwitcher.currStatus = false;
        };
        element.onmouseup = () => {
          capsSwitcher.currStatus = true;
        };
      } else if (element.classList.contains('Tab')) {
        element.onclick = () => contentClass.textarea.setRangeText('    ', contentClass.textarea.selectionStart, contentClass.textarea.selectionEnd, 'end');
      } else if (element.classList.contains('Space')) {
        element.onclick = () => contentClass.textarea.setRangeText(' ', contentClass.textarea.selectionStart, contentClass.textarea.selectionEnd, 'end');
      } else if (element.classList.contains('Backspace')) {
        element.onclick = () => {
          if (contentClass.textarea.selectionStart === 0
            && contentClass.textarea.selectionEnd - contentClass.textarea.selectionStart <= 0) {
            return;
          }
          if (contentClass.textarea.selectionEnd - contentClass.textarea.selectionStart > 0) {
            contentClass.textarea.setRangeText('', contentClass.textarea.selectionStart, contentClass.textarea.selectionEnd, 'end');
          } else {
            contentClass.textarea.setRangeText('', contentClass.textarea.selectionStart - 1, contentClass.textarea.selectionEnd, 'end');
          }
        };
      } else if (element.classList.contains('Delete')) {
        element.onclick = () => contentClass.textarea.setRangeText('', contentClass.textarea.selectionStart, contentClass.textarea.selectionEnd + 1, 'end');
      } else if (element.classList.contains('Enter')) {
        element.onclick = () => contentClass.textarea.setRangeText('\n', contentClass.textarea.selectionStart, contentClass.textarea.selectionEnd, 'end');
      } else {
        element.onclick = () => contentClass.textarea.setRangeText(element.innerHTML, contentClass.textarea.selectionStart, contentClass.textarea.selectionEnd, 'end');
      }
    });
  }
}

const mouseEvents = new CreateMouseListeners();
mouseEvents.createListeners();

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  const key = event.code;

  if (!dictionaryClasses.includes(key)) {
    return;
  }

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
  const returnKeys = ['MetaLeft', 'CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'ControlAlt', 'AltLeft', 'AltRight', 'Del'];

  if (returnKeys.includes(key)) {
    mouseEvents.lintVariable += 1;
  } else if (key === 'Space') {
    contentClass.textarea.setRangeText(' ', selectStart, selectEnd, 'end');
  } else if (key === 'Tab') {
    contentClass.textarea.setRangeText('    ', selectStart, selectEnd, 'end');
  } else if (key === 'Backspace') {
    if (selectStart === 0 && selectEnd - selectStart <= 0) {
      return;
    }
    if (selectEnd - selectStart > 0) {
      contentClass.textarea.setRangeText('', selectStart, selectEnd, 'end');
    } else {
      contentClass.textarea.setRangeText('', selectStart - 1, selectEnd, 'end');
    }
  } else if (key === 'Delete') {
    contentClass.textarea.setRangeText('', selectStart, selectEnd + 1, 'end');
  } else if (key === 'Enter') {
    contentClass.textarea.setRangeText('\n', selectStart, selectEnd, 'end');
  } else {
    contentClass.textarea.setRangeText(contentClass.allKeys[index].innerHTML, selectStart, selectEnd, 'end');
  }
});

document.addEventListener('keyup', (event) => {
  const key = event.code;

  if (!dictionaryClasses.includes(key)) {
    return;
  }

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
});
