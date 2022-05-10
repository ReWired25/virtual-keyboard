export default class CreateMain {
  constructor() {
    this.lintVariable = 0;
  }

  addMain(newClass) {
    this.lintVariable += 1;
    const mainWrapper = document.createElement('main');
    mainWrapper.classList.add(newClass);

    return mainWrapper;
  }

  addTextarea(newClass) {
    this.lintVariable += 1;
    const newArea = document.createElement('textarea');
    newArea.classList.add(newClass);

    return newArea;
  }

  addKeyboardWrapper(newClass) {
    this.lintVariable += 1;
    const keyboardWrapper = document.createElement('div');
    keyboardWrapper.classList.add(newClass);

    return keyboardWrapper;
  }

  addInfo(textOne, textTwo) {
    this.lintVariable += 1;
    const infoWrapper = document.createElement('div');
    infoWrapper.classList.add('info-wrapper');

    const infoTextOne = document.createElement('p');
    infoTextOne.classList.add('info-text');
    const infoTextTwo = document.createElement('p');
    infoTextTwo.classList.add('info-text');

    infoTextOne.innerHTML = textOne;
    infoTextTwo.innerHTML = textTwo;

    infoWrapper.append(infoTextOne, infoTextTwo);

    return infoWrapper;
  }
}
