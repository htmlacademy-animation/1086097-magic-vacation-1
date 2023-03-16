// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import headerLoad from './modules/header';
import AccentTypographyBuild from './modules/animation-of-words-by-letter';


// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
headerLoad();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();


const animationTopScreenTextLine = new AccentTypographyBuild(`.intro__title`, 300, `active-word`, `transform`);
setTimeout(()=>{
  animationTopScreenTextLine.runAnimation();
}, 600);

const animationDate = new AccentTypographyBuild(`.intro__date`, 300, `active-word`, `transform`);
setTimeout(()=>{
  animationDate.runAnimation();
}, 1800);

const animationTitleStory = new AccentTypographyBuild(`.slider__item-title`, 300, `active-word`, `transform`);
setTimeout(()=>{
  animationTitleStory.runAnimation();
}, 600);

let animationTitlePrizes = new AccentTypographyBuild(`.prizes__title`, 300, `active-word`, `transform`);
setTimeout(()=>{
  animationTitlePrizes.runAnimation();
}, 600);
