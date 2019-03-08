const fs = require('fs');
const faker = require('faker');

const randomNumberGenerator = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const years = [
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
];

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

const booleans = [true, false];

const sentences = [
  'Not sure if its just bad but I suppose you get what you pay for.',
  'This was the best product I have ever purchased!',
  'I am going to return this because it just did not meet my expectations.',
  'Make sure you fully charge it before using it or you may regret it.',
  'This definitely did not fit to size.',
  'I would recommend buying a couple sizes bigger otherwise it is not going to fit.',
  'Warning! This product is fake!',
  'Half way into finishing the bag my dog lost her appetite.',
  'My dog loved these treats so much he kept begging for more.',
  'Do not wash these in the washing machine!',
  'It was so easy to tell that these were not real.',
];

const headlines = [
  'Buyer beware !!! Somethings definitely off.',
  'Great dog food',
  'Do not buy this product online',
  'Did not fit into my SD slot',
  'Fake product!',
  'Must buy this product!',
  'Seller not trusted!',
  'It was a scam!',
  'Very very fragile',
  'Recommended to buy it in store instead',
];

// Writes n amount of rows into csv file
const writeNTimes = (fileDest, data, n) => {
  let i = 0;
  const writer = fs.createWriteStream(fileDest);
  let randomMax = randomNumberGenerator(1, 20);

  // Adds appropriate headings into its respective csv file
  if (fileDest === 'database/helpers/reviews.csv') {
    const reviewsHeader = 'product_id,product_name,slug,userid,username,overall_ratings,headline,review,created,updated,verified,helpful,material_quality,durable,easy_use,easy_assemble,water_resistance\n';
    writer.write(reviewsHeader);
  } else if (fileDest === 'database/helpers/images.csv') {
    const reviewsHeader = 'image_url,review_id\n';
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
        randomMax = randomNumberGenerator(1, 20);
      }
      i += 1;
    } while (i < n && ok);
    if (i < n) {
      writer.once('drain', write);
    }
  }
  write();
};

// Generates each row for the reviews table
const generateReviews = () => {
  const productId = randomNumberGenerator(1, 1e7);
  const productName = faker.commerce.productName();
  const slug = `${encodeURI(productName)}${productId}`;
  const userId = randomNumberGenerator(1, 1e7);
  const username = faker.name.findName();
  const overallRatings = randomNumberGenerator(1, 5);
  const headline = headlines[randomNumberGenerator(0, 9)];
  const review = `${sentences[randomNumberGenerator(0, 10)]} ${sentences[randomNumberGenerator(0, 10)]} ${sentences[randomNumberGenerator(0, 10)]}`;
  const created = `${months[randomNumberGenerator(0, 11)]}-${randomNumberGenerator(1, 28)}-${years[randomNumberGenerator(0, 9)]}`;
  const updated = `${months[randomNumberGenerator(0, 11)]}-${randomNumberGenerator(1, 28)}-${years[randomNumberGenerator(0, 9)]}`;
  const verified = booleans[randomNumberGenerator(0, 1)];
  const helpful = randomNumberGenerator(0, 5000);
  const materialQuality = randomNumberGenerator(0, 5);
  const durability = randomNumberGenerator(0, 5);
  const easyToUse = randomNumberGenerator(0, 5);
  const easyToAssemble = randomNumberGenerator(0, 5);
  const waterResistance = randomNumberGenerator(0, 5);

  return `${productId},${productName},${slug},${userId},${username},${overallRatings},${headline},${review},${created},${updated},${verified},${helpful},${materialQuality},${durability},${easyToUse},${easyToAssemble},${waterResistance}\n`;
};

// Generates each row for the images table
const generateImages = () => {
  const imageUrl = images[randomNumberGenerator(0, 9)];
  const revId = randomNumberGenerator(1, 8e7);

  return `${imageUrl},${revId}\n`;
};

const reviewsFileDest = 'database/helpers/reviews.csv';
writeNTimes(reviewsFileDest, generateReviews, 1e7);
const imagesFileDest = 'database/helpers/images.csv';
writeNTimes(imagesFileDest, generateImages, 1e6);
