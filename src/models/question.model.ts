
import { Schema, model } from 'mongoose';

const questionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: (v: string[]) => v.length === 4,
      message: 'There must be exactly 4 options.',
    },
  },
  correctOption: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
  marks: {
    type: Number,
    required: true,
    default: 1,
  },
  negativeMarks: {
    type: Number,
    required: true,
    default: 0,
  },
  tags: {
    type: [String],
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Question = model('Question', questionSchema);
