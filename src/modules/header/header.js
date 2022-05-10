export default class СreateHeader {
  constructor() {
    this.lintVariable = 0;
  }

  addHeader(titleName) {
    this.lintVariable += 1;
    const headerWrapper = document.createElement('header');
    headerWrapper.classList.add('header');

    const newTitle = document.createElement('h1');
    newTitle.classList.add('header-title');
    newTitle.innerHTML = titleName;

    headerWrapper.append(newTitle);

    return headerWrapper;
  }
}
