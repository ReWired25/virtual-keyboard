export default class СreateWrapper {
  constructor() {
    this.lintVariable = 0;
  }

  addWrapper() {
    this.lintVariable += 1;
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    return wrapper;
  }
}
