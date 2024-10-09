// models/product.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaProduct = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  value: {
    type: Number,
    required: [true, 'El valor es requerido']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' // Relación con el modelo Category
  }
});

module.exports = mongoose.model('Product', schemaProduct);
