const mongoose = require("mongoose");
const Schema = mongoose.Schema;

defaultLimit = function () {
  var date = new Date();
  date.setDate(date.getDate() + 2);
  return date;
};

const TODO_Schema = new Schema({
  heading: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    default: "Low",
  },
  text: {
    type: String,
    required: false,
  },
  completeFlag: {
    type: Boolean,
    default: false,
  },
  timeAdded: {
    type: String,
    default: Date.now(),
  },
  timeLimit: {
    type: String,
    default: defaultLimit(),
  },
});

const Todo = mongoose.model("TodoTasks", TODO_Schema);

module.exports = Todo;
