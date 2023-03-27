export default (element, lenght) => {
  for (let i = 0; i <= lenght; i++) {
    if (element.classList.contains(`js-active-slide-${i}`)) {
      element.classList.remove(`js-active-slide-${i}`);
    }
  }
};
