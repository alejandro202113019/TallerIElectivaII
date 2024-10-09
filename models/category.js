// models/category.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaCategory = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product' // Relación con el modelo Product
  }]
});

module.exports = mongoose.model('Category', schemaCategory);
