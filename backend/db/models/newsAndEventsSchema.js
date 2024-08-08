import { Schema, model } from 'mongoose';

const newsAndEventsSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    trim: true,
    required: true,
  },
  heading: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  images: {
    type: Array,
    trim: true,
    required: true,
  },
});
const NewsAndEvents = model('NewsAndEvents', newsAndEventsSchema);

export default NewsAndEvents;
