export const randomNumber = (min, max, num) => {
  return Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) * num;
};
