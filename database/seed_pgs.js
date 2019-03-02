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

const images = [
  'https://loremflickr.com/cache/resized/2016_1936562673_49992bb143_b_690_590_nofilter.jpg',
  'https://loremflickr.com/cache/resized/7924_46570589662_02f05f2773_b_690_590_nofilter.jpg',
  'https://loremflickr.com/cache/resized/7375_9670555858_655e718321_b_690_590_nofilter.jpg',
  'https://loremflickr.com/cache/resized/4804_45978427451_7bace9615f_b_690_590_nofilter.jpg',
  'https://loremflickr.com/cache/resized/4902_46127263711_76af16540f_c_690_590_nofilter.jpg',
  'https://loremflickr.com/cache/resized/4850_46005048544_c9c5471548_b_690_590_nofilter.jpg',
  'https://loremflickr.com/cache/resized/4847_32451220948_d00bf545c9_h_690_590_nofilter.jpg',
  'https://loremflickr.com/cache/resized/21_34346794_c255d8f734_o_690_590_nofilter.jpg',
  'https://loremflickr.com/cache/resized/6104_6340030463_f67df42db9_b_690_590_nofilter.jpg',
  'https://loremflickr.com/cache/resized/7896_33300853788_3a3a99f332_h_690_590_nofilter.jpg',
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
  let randomMax = randomNumberGenerator(1, 10);

  // Adds appropriate headings into its respective csv file
  if (fileDest === 'database/helpers/reviews.csv') {
    const reviewsHeader = 'product_id,product_name,user_id,username,overall_ratings,headline,review,created,updated,verified,helpful\n';
    writer.write(reviewsHeader);
  } else if (fileDest === 'database/helpers/images.csv') {
    const reviewsHeader = 'image_url,review_id\n';
    writer.write(reviewsHeader);
  } else if (fileDest === 'database/helpers/subRatings.csv') {
    const reviewsHeader = 'feature,rating,review_id\n';
    writer.write(reviewsHeader);
  }

  // Writes the data generated into the csv file
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
        randomMax = randomNumberGenerator(1, 10);
      }
      i += 1;
    } while (i < n && ok);
    if (i < n) {
      writer.once('drain', write);
    }
  }
  write();
  console.log('Done!');
};

// Generates each row for the reviews table
const generateReviews = () => {
  const productId = randomNumberGenerator(1, 1e7);
  const productName = faker.commerce.productName();
  const userId = randomNumberGenerator(1, 1e7);
  const username = faker.name.findName();
  const overallRatings = randomNumberGenerator(1, 5);
  const headline = faker.lorem.words();
  const review = faker.lorem.sentences();
  const created = `${months[randomNumberGenerator(0, 11)]} ${randomNumberGenerator(1, 28)}"," ${years[randomNumberGenerator(0, 4)]}`;
  const updated = `${months[randomNumberGenerator(0, 11)]} ${randomNumberGenerator(1, 28)}"," ${years[randomNumberGenerator(0, 4)]}`;
  const verified = faker.random.boolean();
  const helpful = randomNumberGenerator(0, 10000);

  return `'${productId}','${productName}','${userId}','${username}','${overallRatings}','${headline}','${review}','${created}','${updated}',${verified},'${helpful}'\n`;
};

// Generates each row for the images table
const generateImages = () => {
  const imageUrl = images[randomNumberGenerator(0, 10)];
  const reviewId = randomNumberGenerator(0, 2e7);

  return `'${imageUrl}',${reviewId}\n`;
};

// Generates each row for the subRatings table
const generateSubRatings = () => {
  const feature = features[randomNumberGenerator(0, 8)];
  const rating = randomNumberGenerator(1, 5);
  const reviewId = randomNumberGenerator(0, 2e7);

  return `'${feature}','${rating}',${reviewId}\n`;
};

const reviewsFileDest = 'database/helpers/reviews.csv';
writeNTimes(reviewsFileDest, generateReviews, 1e7);

const imagesFileDest = 'database/helpers/images.csv';
writeNTimes(imagesFileDest, generateImages, 1e4);

const subRatingFileDest = 'database/helpers/subRatings.csv';
writeNTimes(subRatingFileDest, generateSubRatings, 1e4);
