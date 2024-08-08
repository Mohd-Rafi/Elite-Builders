import { Schema, model } from 'mongoose';

const reviewSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  reviewer: {
    type: String,
    trim: true,
    required: true,
  },
  review: {
    type: String,
    trim: true,
    required: true,
  },
  youtubelink: {
    type: String,
    trim: true,
    required: true,
  },
});
const UserReview = model('UserReview', reviewSchema);

export default UserReview;
