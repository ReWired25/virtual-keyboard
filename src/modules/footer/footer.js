export default class CreateFooter {
  constructor() {
    this.lintVariable = 0;
  }

  addFooter(githubName, githubLink) {
    this.lintVariable += 1;
    const footerWrapper = document.createElement('footer');
    footerWrapper.classList.add('footer');

    const githubFooter = document.createElement('a');
    githubFooter.innerHTML = githubName;
    githubFooter.href = githubLink;
    githubFooter.classList.add('footer-link');

    footerWrapper.append(githubFooter);
    return footerWrapper;
  }
}
