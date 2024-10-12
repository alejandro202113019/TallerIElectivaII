// models/product.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaUsuario = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: '',
    trim: true
  },
  password: {
    type: String,
    required: [true, 'El valor es requerido']
  }
},{versionKey:false});

module.exports = mongoose.model('Usuario', schemaUsuario);