export default class createFooter {
    constructor() {}

    addFooter(githubName, githubLink) {
        const footerWrapper = document.createElement('footer');
        footerWrapper.classList.add('footer');

        const githubFooter = document.createElement('a');
        githubFooter.innerHTML = githubName;
        githubFooter.href = githubLink;
    }
}