import { Schema, model } from 'mongoose';

const districtSchema = Schema({
  stateName: {
    type: Schema.Types.ObjectId,
    ref: 'State',
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: Boolean,
    trim: true,
    required: true,
  },
});

const District = model('District', districtSchema);

export default District;
