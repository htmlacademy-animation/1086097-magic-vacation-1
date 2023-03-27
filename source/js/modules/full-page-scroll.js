import throttle from 'lodash/throttle';
import {initAnimationTitle, resetAnimationTitle} from './init-animation-title';
import removeActiveSlideClass from "./remove-active-slide-class";

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 1000;
    this.MAX_QUANTITY_OF_SLIDES = 7;
    this.scrollFlag = true;
    this.timeout = null;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.body = document.querySelector(`body`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  // onUrlHashChanged() {
  //   const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);

  //   if (this.screenElements[this.activeScreen].id === `story` && newIndex === 2) {
  //     this.screenElements[this.activeScreen].querySelector(`.screen-masking-background`).classList.add(`screen-masking-background--active`);
  //     setTimeout(() => {
  //       this.screenElements[this.activeScreen].querySelector(`.screen-masking-background`).classList.remove(`screen-masking-background--active`);
  //       this.activeScreen = (newIndex < 0) ? 0 : newIndex;
  //       this.changePageDisplay();
  //     }, 400);
  //   } else {
  //     this.activeScreen = (newIndex < 0) ? 0 : newIndex;
  //     this.changePageDisplay();
  //   }
  // }

  onUrlHashChanged() {
    this.screenElements[this.activeScreen].classList.add(`is-transition`);
    setTimeout(() => {
      this.screenElements[this.activeScreen].classList.remove(`is-transition`);
      const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
      this.activeScreen = (newIndex < 0) ? 0 : newIndex;
      this.changePageDisplay();

    }, 500);
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
    resetAnimationTitle();
    initAnimationTitle();
  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen) => {
      screen.classList.remove(`active`);
      screen.classList.add(`screen--hidden`);
    });

    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    setTimeout(() => {
      this.screenElements[this.activeScreen].classList.add(`active`);

      removeActiveSlideClass(this.body, this.MAX_QUANTITY_OF_SLIDES);
      if (this.screenElements[this.activeScreen].id === `story`) {
        this.body.classList.add(`js-active-slide-0`);
      }
    }, 100);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
