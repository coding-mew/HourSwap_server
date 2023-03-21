import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  topic: {
    type: String,
    enum: ['cleaning', 'cooking', 'gardening', 'teaching', 'transportation', 'other'],
    required: true
  },
  type: {
    type: String,
    enum: ['request', 'offer', 'exchange'],
    required: true
  },
  comment: {
    type: String,
    required: true
    
  },
  valueToken: {
    type: Number,
    min: 0,
    max: 10
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;