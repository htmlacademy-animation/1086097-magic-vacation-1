import {randomNumber} from './utils.js';

export default class AccentTypographyBuild {
  constructor(
      elementSelector,
      timer,
      classForActivate,
      property,
      delay,
  ) {
    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._element = document.querySelector(this._elementSelector);
    this._timeOffset = 0;
    this.delay = delay;

    this.prePareText();
  }

  createElement(letter) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    span.style.transition = `${this._property} ${this._timer}ms cubic-bezier(.13,1.05,.79,.99) ${this._timeOffset}ms`;
    return span;
  }

  prePareText() {
    if (this._element) {
      const text = this._element.textContent.trim().split(/[\s]+/);

      const content = text.reduce((fragmentParent, word) => {
        const wordElement = Array.from(word).reduce((fragment, latter) => {
          fragment.appendChild(this.createElement(latter));
          this._timeOffset = randomNumber(25, 200, 25);
          return fragment;
        }, document.createDocumentFragment());

        const wordContainer = document.createElement(`span`);
        wordContainer.classList.add(`animation-word`);
        wordContainer.appendChild(wordElement);
        fragmentParent.appendChild(wordContainer);
        fragmentParent.appendChild(document.createTextNode(`\u0020`));

        return fragmentParent;
      }, document.createDocumentFragment());

      this._element.innerHTML = ``;
      this._element.appendChild(content);
    }
  }

  runAnimation() {
    setTimeout(()=>{
      if (this._element) {
        this._element.classList.add(this._classForActivate);
      }
    }, this.delay);
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
  }
}
