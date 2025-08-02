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
  user: {
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
