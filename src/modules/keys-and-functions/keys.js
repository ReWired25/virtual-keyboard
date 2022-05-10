export default class Keys {
  constructor() {
    this.lintVariable = 0;
  }

  addKey(keyCode) {
    this.lintVariable += 1;
    const newKey = document.createElement('div');
    newKey.classList.add('key');
    newKey.classList.add(keyCode);

    return newKey;
  }

  createKeys(dictionaryArray) {
    const arrKeys = [];

    for (let i = 0; i < dictionaryArray.length; i += 1) {
      const newKey = this.addKey(dictionaryArray[i]);

      arrKeys.push(newKey);
    }

    return arrKeys;
  }

  fillKeys(dictionaryArray, arrKeys) {
    const arr = arrKeys;
    this.lintVariable += 1;
    for (let i = 0; i < dictionaryArray.length; i += 1) {
      arr[i].innerHTML = dictionaryArray[i];
    }
  }
}
