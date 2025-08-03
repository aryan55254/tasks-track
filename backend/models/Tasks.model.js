const mongoose = require("mongoose");

const Taskschema = new mongoose.Schema({
  Task: {
    type: String,
    required: true,
  },
  Completed: {
    type: Boolean,
    default: false,
  },
  //connected to user model to give the user only thier own tasks
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tasks", Taskschema);
//tasks model