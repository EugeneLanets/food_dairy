import mongoose from 'mongoose';

const { Schema, SchemaTypes, model } = mongoose;

const foodSchema = new Schema({
  type: String,
  user: {
    type: SchemaTypes.Number,
    ref: 'User',
    required: true,
  },
  description: String,
  date: Date,
});

export default model('Food', foodSchema);
