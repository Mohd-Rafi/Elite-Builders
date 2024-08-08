import { Schema, model } from 'mongoose';

const stateSchema = Schema({
  stateName: {
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

const State = model('State', stateSchema);

export default State;
