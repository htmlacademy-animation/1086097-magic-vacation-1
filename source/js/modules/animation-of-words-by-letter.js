export default class AccentTypographyBuild {
  constructor(
      elementSelector,
      timer,
      classForActivate,
      property,
      timeOffset = 0,
  ) {
    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._element = document.querySelector(this._elementSelector);
    this._timeOffset = timeOffset;
    this.delta = 50;

    this.prePareText();
  }

  createElement(letter) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    span.style.transition = `${this._property} ${this._timer}ms cubic-bezier(.13,1.05,.79,.99) ${this._timeOffset}ms`;
    return span;
  }

  prePareText() {
    if (!this._element) {
      return;
    }
    const text = this._element.textContent.trim().split(/[\s]+/).filter((latter) => latter !== ``);

    const content = text.reduce((fragmentParent, word) => {
      const wordElement = Array.from(word).reduce((fragment, latter, index) => {
        if (index % 2 === 0) {
          fragment.appendChild(this.createElement(latter));
          this._timeOffset -= this.delta;
        } else if (index % 3 === 0) {
          fragment.appendChild(this.createElement(latter));
          this._timeOffset += this.delta;
        } else {
          fragment.appendChild(this.createElement(latter));
          this._timeOffset += this.delta;
        }
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

  runAnimation() {
    if (!this._element) {
      return;
    }
    this._element.classList.add(this._classForActivate);
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
  }
}
