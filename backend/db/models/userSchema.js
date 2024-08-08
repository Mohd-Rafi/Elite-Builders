import { Schema, model } from 'mongoose';

const userSchema = Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: Array },
    role: { type: String, default: 'user' },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
