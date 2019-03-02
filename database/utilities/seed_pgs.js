const fs = require('fs');
const faker = require('faker');
const path = require('path');
const moment = require('moment');

const start = Date.now();
console.log(`Start: ${moment().format('HH:MM:SS')}`);

const randomNumberGenerator = (min, max) => {
  let randomNum = Math.floor(Math.random() * max);
  if (randomNum < min) {
    randomNum = Math.floor(Math.random() * max);
  }
  return randomNum;
};


const years = ['2019', '2018', '2017', '2016', '2015'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];


// const fileDestination = path.join(__dirname, 'reviews.csv');
const reviewStream = fs.createWriteStream('reviews.csv');

const records = 1000;

const writeData = () => {
  const reviewsHeader = 'review_id, product_id, product_name, user_id, username, overall_ratings, headline, review, created, updated, verified, helpful\n';
  reviewStream.write(reviewsHeader);
  for (let i = 0; i < records; i += 1) {
    for (let j = 1; j < 51; j += 1) {
      const review_id = (i * records) + j;
      const product_id = randomNumberGenerator(1, 10000000);
      const product_name = faker.commerce.productName();
      const user_id = randomNumberGenerator(1, 10000000);
      const username = faker.name.findName();
      const overall_ratings = randomNumberGenerator(1, 5);
      const headline = faker.lorem.words();
      const review = faker.lorem.sentences();
      const created = `${months[randomNumberGenerator(0, 11)]} ${randomNumberGenerator(1, 28)}, ${years[randomNumberGenerator(0, 4)]}`;
      const updated = `${months[randomNumberGenerator(0, 11)]} ${randomNumberGenerator(1, 28)}, ${years[randomNumberGenerator(0, 4)]}`;
      const verified = faker.random.boolean();
      const helpful = faker.random.number();
      reviewStream.write(`${review_id},${product_id},"${product_name}",${user_id},"${username}",${overall_ratings},"${headline}","${review}","${created}","${updated}","${verified}",${helpful}\n`);
    }
  }
};

console.log('Generating Data...');
writeData();
console.log('Writing data to csv...');
const end = Date.now();
console.log(`Time Elapsed: ${moment(end).diff(moment(start), 'seconds')} seconds`);
