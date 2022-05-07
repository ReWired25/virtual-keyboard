export default class createWrapper {
    constructor() {}

    addWrapper() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');

        return wrapper;
    }
}