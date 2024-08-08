import { Schema, model } from 'mongoose';

const schema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  location: {
    type: String,
    trim: true,
    required: true,
  },
  district: {
    type: String,
    trim: true,
    required: true,
  },
  areaRange: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    trim: true,
    required: true,
  },
  bedroom: {
    type: Number,
    trim: true,
    required: true,
  },
  hall: {
    type: Number,
    trim: true,
    required: true,
  },
  kitchen: {
    type: Number,
    trim: true,
    required: true,
  },
  price: {
    type: String,
    trim: true,
    required: true,
  },
});
const Listing = model('Listing', schema);

export default Listing;
