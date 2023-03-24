import TaskWithUser from "../models/matchTaskAndUserModel";

// POST /task-applications
export const applyForTask = async (req, res) => {
  const { user_id, task_id } = req.body;

  try {
    // Check if the user has already applied for this task
    const existingApplication = await TaskWithUser.findOne({ user_id, task_id });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this task' });
    }

    // Create a new task application
    const taskWithUser = new TaskWithUser({ user_id, task_id });
    await taskWithUser.save();

    res.status(201).json({ message: 'Task application created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the task application' });
  }
};

// GET /task-applications
export const getTaskApplicationsByUserId = async (req, res) => {
  const { user_id } = req.query;

  try {
    // Find all task applications for the specified user
    const taskWithUser = await TaskWithUser.find({ user_id })
      .populate('task_id');

    res.status(200).json(taskWithUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving task applications' });
  }
};

// DELETE /task-applications/:id
export const withdrawTaskApplication = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the task application by ID
    const taskWithUser = await TaskWithUser.findById(id);

    if (!taskWithUser) {
      return res.status(404).json({ message: 'Task application not found' });
    }

    // Delete the task application
    await taskWithUser.remove();

    res.status(200).json({ message: 'Task application deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the task application' });
  }
};
