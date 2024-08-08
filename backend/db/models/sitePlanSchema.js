import { Schema, model } from 'mongoose';

const sitePlanSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  siteplangallery: [
    {
      image: { type: String, trim: true, required: true },
      description: { type: String, required: true },
    },
  ],
});
const SitePlan = model('SitePlan', sitePlanSchema);

export default SitePlan;
