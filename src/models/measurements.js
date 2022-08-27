const {Schema, SchemaTypes, model} = require('mongoose');
const measurementSchema = new Schema({
    date: Date,
    plasma: Number,
    blood: Number,
  }
);

module.exports = model('Measurment', measurementSchema);
