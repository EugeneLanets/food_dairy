const { Schema, SchemaTypes, model } = require('mongoose');

const measurementSchema = new Schema({
  date: Date,
  plasma: Number,
  blood: Number,
  type: String,
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = model('Measurement', measurementSchema);
