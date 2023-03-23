import AccentTypographyBuild from './animation-of-words-by-letter';

const animationTopScreenTextLine = new AccentTypographyBuild(`.intro__title`, 300, `active-word`, `transform`, 400);
const animationDate = new AccentTypographyBuild(`.intro__date`, 300, `active-word`, `transform`, 800);
const animationTitleStory = new AccentTypographyBuild(`.slider__item-title`, 300, `active-word`, `transform`, 400);
const animationTitlePrizes = new AccentTypographyBuild(`.prizes__title`, 300, `active-word`, `transform`, 400);
const animationTitleRules = new AccentTypographyBuild(`.rules__title`, 300, `active-word`, `transform`, 400);
const animationTitleGame = new AccentTypographyBuild(`.game__title`, 300, `active-word`, `transform`, 400);

export const initAnimationTitle = () => {
  animationTopScreenTextLine.runAnimation();
  animationDate.runAnimation();
  animationTitleStory.runAnimation();
  animationTitlePrizes.runAnimation();
  animationTitleRules.runAnimation();
  animationTitleGame.runAnimation();
};

export const resetAnimationTitle = () => {
  animationTopScreenTextLine.destroyAnimation();
  animationDate.destroyAnimation();
  animationTitleStory.destroyAnimation();
  animationTitlePrizes.destroyAnimation();
  animationTitleRules.destroyAnimation();
  animationTitleGame.destroyAnimation();
};
