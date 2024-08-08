import { Schema, model } from 'mongoose';

const homeSliderSchema = Schema({
  sliderName: {
    type: String,
    trim: true,
    required: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  link: {
    type: String,
    trim: true,
    required: true,
  },
  images: {
    type: Array,
    trim: true,
    required: true,
  },
  status: {
    type: Boolean,
    trim: true,
    required: true,
  },
});
const HomeSlider = model('HomeSlider', homeSliderSchema);

export default HomeSlider;
