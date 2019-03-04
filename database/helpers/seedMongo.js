// const mongoose = require('mongoose');

// const port = process.env.PORT || '172.17.0.2';

// mongoose.connect(
//   `mongodb://${port}:27017/products`, {
//     useNewUrlParser: true,
//   },
// );

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('connected to Mongo');
// });

// const {
//   Schema,
// } = mongoose;

// // Schemas: What every row looks like
// const reviewSchema = new Schema({
//   review_id: Number,
//   product_id: Number,
//   product_name: String,
//   user_id: Number,
//   username: String,
//   overall_ratings: Number,
//   headline: String,
//   review: String,
//   created: String,
//   updated: String,
//   verified: Boolean,
//   helpful: Number,
// });

// const imageSchema = new Schema({
//   image_id: Number,
//   image_url: String,
//   review_id: Number,
// });

// const subRatingSchema = new Schema({
//   subrating_id: Number,
//   feature: String,
//   rating: Number,
//   review_id: Number,
// });

// // Collections
// const Reviews = mongoose.model('Reviews', reviewSchema);
// const Images = mongoose.model('Images', imageSchema);
// const SubRatings = mongoose.model('SubRatings', subRatingSchema);

// // && mongoimport -d products -c Images --type csv --file /Users/lydiahu/Documents/HackReactor/Immersive/SDC/service_reviews_lh/database/helpers/images.csv --headerline && mongoimport -d products -c SubRatings --type csv --file /Users/lydiahu/Documents/HackReactor/Immersive/SDC/service_reviews_lh/database/helpers/subratings.csv --headerline",