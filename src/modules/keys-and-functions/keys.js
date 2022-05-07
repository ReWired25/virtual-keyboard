export default class Keys {
    constructor() {}

    addKey(keyCode) {
        const newKey = document.createElement('div');
        newKey.classList.add('key');
        newKey.classList.add(keyCode);

        return newKey;
    }

    createKeys(dictionaryArray) {
        let arrKeys = [];

        for (let i = 0; i < dictionaryArray.length; i++) {
            let newKey = this.addKey(dictionaryArray[i]);

            arrKeys.push(newKey);
        }

        return arrKeys;
    }

    fillKeys(dictionaryArray, arrKeys) {
        for (let i = 0; i < dictionaryArray.length; i++) {
            arrKeys[i].innerHTML = dictionaryArray[i];
        }
    }
}