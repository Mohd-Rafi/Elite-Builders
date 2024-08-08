import { Schema, model } from 'mongoose';

const enquirySchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    mobileno: {
      type: String,
      trim: true,
      required: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Enquiry = model('Enquiry', enquirySchema);

export default Enquiry;
