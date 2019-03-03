const fs = require('fs');
const faker = require('faker');

const randomNumberGenerator = (min, max) => {
  let randomNum = Math.floor(Math.random() * max);
  if (randomNum < min) {
    randomNum = Math.floor(Math.random() * max);
  }
  return randomNum;
};

const years = ['2019', '2018', '2017', '2016', '2015'];

const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

const images = [
  'https://s3.amazonaws.com/saleboat/product1.jpg',
  'https://s3.amazonaws.com/saleboat/product2.jpg',
  'https://s3.amazonaws.com/saleboat/product3.jpg',
  'https://s3.amazonaws.com/saleboat/product4.jpg',
  'https://s3.amazonaws.com/saleboat/product5.jpg',
  'https://s3.amazonaws.com/saleboat/product6.jpg',
  'https://s3.amazonaws.com/saleboat/product7.jpg',
  'https://s3.amazonaws.com/saleboat/product8.jpg',
  'https://s3.amazonaws.com/saleboat/product9.jpg',
  'https://s3.amazonaws.com/saleboat/product10.jpg',
];

const features = [
  'Material Quality',
  'Sound Quality',
  'Durability',
  'Battery Life',
  'Picture Quality',
  'Water Resistance',
  'Easy to Use',
  'Easy to Assemble',
];

// Writes n amount of rows into csv file
const writeNTimes = (fileDest, data, n) => {
  let i = 0;
  const writer = fs.createWriteStream(fileDest);
  let randomMax = randomNumberGenerator(0, 2);

  // Adds appropriate headings into its respective csv file
  if (fileDest === 'database/helpers/reviews.csv') {
    const reviewsHeader = 'review_id,product_id,product_name,user_id,username,overall_ratings,headline,review,created,updated,verified,helpful\n';
    writer.write(reviewsHeader);
  } else if (fileDest === 'database/helpers/images.csv') {
    const reviewsHeader = 'image_id,image_url,review_id\n';
    writer.write(reviewsHeader);
  } else if (fileDest === 'database/helpers/subRatings.csv') {
    const reviewsHeader = 'subrating_id,feature,rating,review_id\n';
    writer.write(reviewsHeader);
  }

  // Writes the data generated into the csv file
  function write() {
    let ok = true;
    do {
      if (i === n) {
        writer.write(data(), 'utf8');
      } else {
        if (i <= 9e6) {
          while (randomMax > 0 && ok) {
            ok = writer.write(data(), 'utf8');
            randomMax -= 1;
          }
          randomMax = randomNumberGenerator(0, 2);
        }
        if (i > 9e6 && i <= 99e5) {
          randomMax = randomNumberGenerator(10, 30);
          while (randomMax > 0 && ok) {
            ok = writer.write(data(), 'utf8');
            randomMax -= 1;
          }
          randomMax = randomNumberGenerator(10, 30);
        }
        if (i > 9e5) {
          randomMax = randomNumberGenerator(500, 1000);
          while (randomMax > 0 && ok) {
            ok = writer.write(data(), 'utf8');
            randomMax -= 1;
          }
          randomMax = randomNumberGenerator(500, 1000);
        }
      }
      i += 1;
    } while (i < n && ok);
    if (i < n) {
      writer.once('drain', write);
    }
  }
  write();
};

let reviewId = 1;
// Generates each row for the reviews table
const generateReviews = () => {
  const productId = randomNumberGenerator(1, 1e7);
  const productName = faker.commerce.productName();
  const userId = randomNumberGenerator(1, 1e7);
  const username = faker.name.findName();
  const overallRatings = randomNumberGenerator(1, 5);
  const headline = faker.lorem.words();
  const review = faker.lorem.sentences();
  const created = `${months[randomNumberGenerator(0, 11)]}-${randomNumberGenerator(1, 28)}-${years[randomNumberGenerator(0, 4)]}`;
  const updated = `${months[randomNumberGenerator(0, 11)]} ${randomNumberGenerator(1, 28)}-${years[randomNumberGenerator(0, 4)]}`;
  const verified = faker.random.boolean();
  const helpful = randomNumberGenerator(0, 5e3);

  return `${reviewId++},${productId},'${productName}',${userId},'${username}',${overallRatings},'${headline}','${review}','${created}','${updated}',${verified},${helpful}\n`;
};

let imageId = 1;
// Generates each row for the images table
const generateImages = () => {
  const imageUrl = images[randomNumberGenerator(0, 10)];
  const reviewId = randomNumberGenerator(1, 7e6);

  return `${imageId++},'${imageUrl}',${reviewId}\n`;
};

let subratingId = 1;
// Generates each row for the subRatings table
const generateSubRatings = () => {
  const feature = features[randomNumberGenerator(0, 8)];
  const rating = randomNumberGenerator(1, 5);
  const reviewId = randomNumberGenerator(1, 7e6);

  return `${subratingId++},'${feature}',${rating},${reviewId}\n`;
};

const reviewsFileDest = 'database/helpers/reviews.csv';
writeNTimes(reviewsFileDest, generateReviews, 1e7);
console.log('Successfully wrote reviews data!');
const imagesFileDest = 'database/helpers/images.csv';
writeNTimes(imagesFileDest, generateImages, 1e6);
console.log('Successfully wrote images data!');
const subRatingFileDest = 'database/helpers/subRatings.csv';
writeNTimes(subRatingFileDest, generateSubRatings, 1e6);
console.log('Successfully wrote subratings data!');
