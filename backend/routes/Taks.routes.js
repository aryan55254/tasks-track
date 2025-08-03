const Tasks = require("../models/Tasks.model");
const taskrouter = require("express").Router();
const authmiddleware = require("../middlewares/auth.middleware");
//work
taskrouter.post("/add", authmiddleware, async (req, res) => {
  try {
    const { Task } = req.body;
    if (!Task) {
      res.status(400).json({ message: "plz add a task first " });
      return;
    }
    const newtask = new Tasks({
      User: req.user._id,
      Task: Task,
    });
    await newtask.save();
    res.status(200).json({ message: "task added" });
  } catch (err) {
    res.status(500).json({ message: "internal server error : ", err });
  }
});

taskrouter.delete("/:id", authmiddleware, async (req, res) => {
  try {
    const task = await Tasks.findOneAndDelete({
      _id: req.params.id,
      User: req.user._id,
    });
    if (!task) {
      return res.status(404).json({
        message: "Task not found or you do not have permission to delete it",
      });
    }
    res.status(200).json({ message: "task deleted" });
  } catch (err) {
    res.status(500).json({ message: "internal server error : ", err });
  }
});

taskrouter.post("/edit/:id", authmiddleware, async (req, res) => {
  try {
    const { Task } = req.body;
    if (!Task) {
      res.status(400).json({ message: "plz add a task first " });
      return;
    }
    const task = await Tasks.findOneAndUpdate(
      {
        _id: req.params.id,
        User: req.user._id,
      },
      { Task: task },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({
        message: "Task not found or you do not have permission to delete it",
      });
    }
    res.status(200).json({ message: " task updated " });
  } catch (err) {
    res.status(500).json({ message: "internal server error : ", err });
  }
});

taskrouter.post("/changestatus/:id", authmiddleware, async (req, res) => {
  try {
    const task = await Tasks.findOne({
      _id: req.params.id,
      User: req.user._id,
    });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or you do not have permission" });
    }
    task.completed = !task.completed;
    await task.save();
    res.status(200).json({ message: "status changed" });
  } catch (err) {
    res.status(500).json({ message: "internal server error : ", err });
  }
});

taskrouter.delete(
  "/deletebystatus/:status",
  authmiddleware,
  async (req, res) => {
    try {
      const completionstatus = req.params.status === "true";
      const result = await Tasks.deleteMany({
        Completed: completionstatus,
        User: req.user._id,
      });
      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ message: "No tasks found with that status to delete" });
      }
      res.status(200).json({
        message: `${result.deletedCount} tasks were deleted successfully`,
      });
    } catch (err) {
      res.status(500).json({ message: "internal server error", err });
    }
  }
);
//work
taskrouter.get("/", authmiddleware, async (req, res) => {
  try {
    const tasks = await Tasks.find({
      User: req.user._id,
    });
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "tasks not found" });
    }
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ message: "internal server error : ", err });
  }
});

taskrouter.get("/:status", authmiddleware, async (req, res) => {
  try {
    const completionstatus = req.params.status === "true";
    const result = await Tasks.find({
      User: req.user._id,
      Completed: completionstatus,
    });
    if (!result || result.length == 0) {
      return res.status(404).json({ message: "tasks not found" });
    }
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: "internal server error : ", err });
  }
});

module.exports = taskrouter;
