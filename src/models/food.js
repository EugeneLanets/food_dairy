const { Schema, SchemaTypes, model } = require('mongoose');

const foodSchema = new Schema({
  type: String,
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  description: String,
  structure: [{
    name: String,
    quantity: Number,
  }],
  date: Date,
});

module.exports = model('User', foodSchema);
