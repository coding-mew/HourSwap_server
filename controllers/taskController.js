import Task from '../models/taskModel.js';


const createTask = async (req, res) => {
  try {
    const { topic, type, description, valueToken } = req.body;
    console.log(req.user)
    const userId = req.user.userId;

    const task = await Task.create({
      topic,
      type,
      description,
      valueToken,
      created_by: userId 
    });

    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const deleteTaskById = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Task.findByIdAndDelete(id);
      if (deleted) {
        return res.status(200).send("Task deleted");
      }
      throw new Error("Task not found");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { topic, type, comment, valueToken } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { topic, type, comment, valueToken },
      { new: true }
    );

    if (updatedTask) {
      return res.status(200).send(updatedTask);
    }
    throw new Error("Task not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



 const getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find().populate('created_by');
      res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getTasksForUser = async (req, res) => {
    try {
      const tasks = await Task.find({ created_by: req.params.userId }).populate('created_by');
      res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const getAllOffers = async (req, res) => {
    try {
      const tasks = await Task.find({ type: 'offer' }).populate('created_by');
      res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getAllRequests = async (req, res) => {
    try {
      const tasks = await Task.find({ type: 'get' }).populate('created_by');
      res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getAllExchanges = async (req, res) => {
    try {
      const tasks = await Task.find({ type: 'exchange' }).populate('created_by');
      res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

  export { getTasksForUser, createTask, getAllOffers, getAllRequests, getAllExchanges, getAllTasks, deleteTaskById, updateTaskById };