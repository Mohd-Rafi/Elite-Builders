import { Schema, Types, model } from 'mongoose';

const statusGallerySchema = Schema({
  name: {
    type: Schema.Types.ObjectId,
    ref: 'StatusAdding',
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    trim: true,
    required: true,
  },
  images: {
    type: Array,
    trim: true,
    required: true,
  },
});
const StatusGallery = model('StatusGallery', statusGallerySchema);

export default StatusGallery;
