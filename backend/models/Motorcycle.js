const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const motorcycleSchema = new Schema({
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  specifications: {
    type: String,
    required: false
  },
  images: {
    type: [String],
    required: true
  },
  condition: {
    type: String,
    enum: ['new', 'used'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Sport', 'Tour', 'Heritage', 'Adventure', 'Urban Mobility'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    enum: ['available', 'sold'],
    required: true
  },
  sellerContact: {
    type: String,
    required: true
  },
  conditionScore: {
    type: Number,
    required: true
  }
});

const Motorcycle = mongoose.model('Motorcycle', motorcycleSchema);
module.exports = Motorcycle;