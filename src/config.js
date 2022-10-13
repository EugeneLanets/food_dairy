import dotenv from 'dotenv';

dotenv.config();

export const { TOKEN, USER_ID } = process.env;
export const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI;
