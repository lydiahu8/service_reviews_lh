const randomNumberGenerator = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomNumber = (context, events, done) => {
  const randomNum = randomNumberGenerator(1, 10000000);
  context.vars['randomNum'] = randomNum;
  return done();
};

module.exports = {
  randomNumber,
};
