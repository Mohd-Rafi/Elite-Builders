import { Schema, model } from 'mongoose';

const popupSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
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
});

const Popup = model('Popup', popupSchema);

export default Popup;
