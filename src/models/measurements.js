import mongoose from 'mongoose';

const { Schema, SchemaTypes, model } = mongoose;

const measurementSchema = new Schema({
  date: Date,
  plasma: Number,
  blood: Number,
  type: String,
  user: {
    type: SchemaTypes.Number,
    ref: 'User',
    required: true,
  },
});

export default model('Measurement', measurementSchema);
