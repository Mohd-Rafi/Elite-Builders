import { Schema, model } from 'mongoose';

const qrSchema = Schema({
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
const QRCode = model('QRCode', qrSchema);

export default QRCode;
