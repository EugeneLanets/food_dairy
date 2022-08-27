const dotenv = require('dotenv');
dotenv.config();
const { TOKEN } = process.env;
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  TOKEN,
}
