import { Schema, model } from 'mongoose';

const statusAddingSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);
const StatusAdding = model('StatusAdding', statusAddingSchema);

export default StatusAdding;
