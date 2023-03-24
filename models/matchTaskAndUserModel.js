import mongoose from 'mongoose';

const TaskWithUserSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Task',
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const TaskWithUser = mongoose.model('TaskApplication', taskApplicationSchema);

export default TaskWithUser;