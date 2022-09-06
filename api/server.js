//Handle Api
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/todoModel");

const app = express();

app.use(express.json());

app.use(cors()); //Stops cross-origin errors

mongoose
  .connect("mongodb://localhost:27017/TODO-MERN", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

//Routes

app.get("/todo", async (req, res) => {
  //Req to host 5001/todos
  //It should find all todos
  //return
  const todo = await Todo.find(); //await as it is async funtion
  res.json(todo);
});
app.get("/todo/getCompleted", async (req, res) => {
  //Req to host 5001/todos
  //It should find all todos
  //return
  const todo = await Todo.find({ completeFlag: true }); //await as it is async funtion
  res.json(todo);
});
app.get("/todo/getPriority/:prio", async (req, res) => {
  //Req to host 5001/todos
  //It should find all todos
  //return
  const todo = await Todo.find({ priority: req.params.prio }); //await as it is async funtion
  res.json(todo);
});

app.get("/todo/getRemaining", async (req, res) => {
  //Req to host 5001/todos
  //It should find all todos
  //return
  const todo = await Todo.find({ completeFlag: false }); //await as it is async funtion
  res.json(todo);
});
app.post("/todo/new", async (req, res) => {
  //Req to host 5001/todos
  //It should find all todos
  //return
  const { heading, text, priority } = req.body;
  const checkPresent = await Todo.findOne({ heading });
  if (!checkPresent) {
    if (text) {
      const todo = new Todo({
        heading: heading,
        text: text,
        priority: priority,
      });
      todo.save();
      res.json({ msg: "Success", todo });
    } else {
      const todo = new Todo({
        heading: req.body.heading,
        priority: priority,
      });
      todo.save();
      res.json({ msg: "Success", todo });
    }
  } else {
    res.json({ msg: "Entry already present" });
  }
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json({ msg: "Success", result });
});

app.put("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completeFlag = !todo.completeFlag;
  todo.save();
  res.json({ msg: "Success", todo });
});

app.listen(3001, () => console.log("Server Started"));
