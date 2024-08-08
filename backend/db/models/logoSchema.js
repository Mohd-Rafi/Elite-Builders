import { Schema, model } from 'mongoose';

const logoSchema = Schema({
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
const Logo = model('Logo', logoSchema);

export default Logo;
