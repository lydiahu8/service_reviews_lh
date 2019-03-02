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

const records = 1000001;

function writeNTimes(fileDest, data, n) {
  let i = 0;
  const writer = fs.createWriteStream(fileDest);
  const reviewsHeader = 'product_id,product_name,user_id,username,overall_ratings,headline,review,created,updated,verified,helpful\n';
  writer.write(reviewsHeader);

  let randomMax = randomNumberGenerator(2, 10);

  function write() {
    let ok = true;
    do {
      if (i === n) {
        writer.write(data(), 'utf8');
      } else {
        while (randomMax > 0 && ok) {
          ok = writer.write(data(), 'utf8');
          randomMax -= 1;
        }
        randomMax = randomNumberGenerator(2, 10);
      }
      i += 1;
    } while (i < n && ok);
    if (i < n) {
      writer.once('drain', write);
    }
  }
  write();

  // writer.end();
  // writer.on('finish', () => console.log('Success!'));
}

const generateReviews = () => {
  const product_id = randomNumberGenerator(1, 10000000);
  const product_name = faker.commerce.productName();
  const user_id = randomNumberGenerator(1, 10000000);
  const username = faker.name.findName();
  const overall_ratings = randomNumberGenerator(1, 5);
  const headline = faker.lorem.words();
  const review = faker.lorem.sentences();
  const created = `${months[randomNumberGenerator(0, 11)]} ${randomNumberGenerator(1, 28)}"," ${years[randomNumberGenerator(0, 4)]}`;
  const updated = `${months[randomNumberGenerator(0, 11)]} ${randomNumberGenerator(1, 28)}"," ${years[randomNumberGenerator(0, 4)]}`;
  const verified = faker.random.boolean();
  const helpful = randomNumberGenerator(0, 10000);

  return `'${product_id}','${product_name}','${user_id}','${username}','${overall_ratings}','${headline}','${review}','${created}','${updated}',${verified},'${helpful}'\n`;
};


console.log('Generating Data...');

const reviewsFileDest = path.join(__dirname, 'reviews.csv');
writeNTimes(reviewsFileDest, generateReviews, records);

console.log('Writing data to csv...');
const end = Date.now();
console.log(`Time Elapsed: ${moment(end).diff(moment(start), 'seconds')} seconds`);
