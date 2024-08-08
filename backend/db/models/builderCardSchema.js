import { Schema, model } from 'mongoose';

const builderCardSchema = Schema({
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
  district: {
    type: String,
    trim: true,
    required: true,
  },
  permitno: {
    type: String,
    trim: true,
    required: true,
  },
  images: {
    type: Array,
    trim: true,
    required: true,
  },
  logo: {
    type: Schema.Types.ObjectId,
    ref: 'Logo',
    trim: true,
    required: true,
  },
  qrcode: {
    type: Schema.Types.ObjectId,
    ref: 'QRCode',
    trim: true,
    required: true,
  },
  gallery: {
    type: Schema.Types.ObjectId,
    ref: 'Gallery',
    trim: true,
    required: true,
  },
  siteplan: {
    type: Schema.Types.ObjectId,
    ref: 'SitePlan',
    trim: true,
    required: true,
  },
  statusgallery: [
    {
      image: { type: String, trim: true, required: true },
      date: { type: Date, required: true },
    },
  ],
  amenitiesgallery: [
    {
      image: { type: String, trim: true, required: true },
      description: { type: String, required: true },
    },
  ],
  location: {
    type: String,
    trim: true,
    required: true,
  },
  areaRange: {
    type: String,
    trim: true,
    required: true,
  },
  apartmenttype: {
    type: String,
    trim: true,
    required: true,
  },
  kreranumber: {
    type: String,
    trim: true,
    required: true,
  },
  whatsappno: {
    type: Number,
    trim: true,
    required: true,
  },
  telephoneno: {
    type: Number,
    trim: true,
    required: true,
  },
  locationurl: {
    type: String,
    trim: true,
    required: true,
  },
  brochure: {
    type: String,
    trim: true,
    required: true,
  },
  youtube: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    trim: true,
    required: true,
  },
  institutions: {
    type: String,
    trim: true,
  },
  offices: {
    type: String,
    trim: true,
  },
  facilities: {
    type: String,
    trim: true,
  },
  institutions: {
    type: String,
    trim: true,
  },
  worship: {
    type: String,
    trim: true,
  },
  transportation: {
    type: String,
    trim: true,
  },
  shopping: {
    type: String,
    trim: true,
  },
  landmarks: {
    type: String,
    trim: true,
  },
});

const BuilderCard = model('BuilderCard', builderCardSchema);

export default BuilderCard;
