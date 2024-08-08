import { Schema, model } from 'mongoose';

const careerSchema = Schema({
  role: {
    type: String,
    trim: true,
    required: true,
  },
  vaccancies: {
    type: String,
    trim: true,
    required: true,
  },
});

const Career = model('Career', careerSchema);

export default Career;
