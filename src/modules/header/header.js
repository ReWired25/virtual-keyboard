export default class createHeader {
    constructor() {}

    addHeader(titleName) {
        const headerWrapper = document.createElement('header');
        headerWrapper.classList.add('header');

        const newTitle = document.createElement('h1');
        newTitle.classList.add('header-title');
        newTitle.innerHTML = titleName;

        headerWrapper.append(newTitle);

        return headerWrapper;
    }
}