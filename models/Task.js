const mongoose = require('mongoose'); // Import mongoose

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'overdue'],
    default: 'pending',
  },
  category: { type: String, default: 'general' }, // Add categories
});

// Export the Task model
module.exports = mongoose.model('Task', TaskSchema);

