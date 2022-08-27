const {Schema, SchemaTypes, model} = require('mongoose');
const userSchema = new Schema({
    _id: String,
    firstName: String,
    lastName: String,
    userName: String
  }
);

module.exports = model('User', userSchema);
