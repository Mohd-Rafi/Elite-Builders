import { Schema, model } from 'mongoose';

const gallerySchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  images: {
    type: Array,
    trim: true,
    required: true,
  },
});
const Gallery = model('Gallery', gallerySchema);

export default Gallery;
