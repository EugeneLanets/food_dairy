import mongoose from 'mongoose';

const { model, Schema } = mongoose;
const userSchema = new Schema({
  _id: Number,
  firstName: String,
  lastName: String,
  userName: String,
});

export default model('User', userSchema);
