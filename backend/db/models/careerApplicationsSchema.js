import { Schema, model } from 'mongoose';

const careerApplicationsSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileno: {
    type: String,
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
});

const CareerApplications = model(
  'CareerApplications',
  careerApplicationsSchema
);

export default CareerApplications;
