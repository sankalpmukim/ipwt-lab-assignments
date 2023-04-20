require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
mongoose.connection.once("open", () =>
  console.log("MongoDB connected successfully")
);

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  designation: String,
  department: String,
  salary: Number,
});

const Employee = mongoose.model("Employee", employeeSchema);

// Create a new employee
app.post("/employee", (req, res) => {
  const employee = new Employee(req.body);
  try {
    employee.save();
    res.send(employee);
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      res
        .status(400)
        .send("Employee with that email or employeeId already exists");
    } else {
      throw error;
    }
  }
});

// Read an employee
app.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  Employee.findOne({ $or: [{ employeeId: id }, { email: id }] }).exec(
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.send(result);
      } else {
        res.status(404).send("Employee not found");
      }
    }
  );
});

// Update an employee
app.put("/employee/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { $or: [{ employeeId: id }, { email: id }] };
  const update = req.body;

  try {
    const options = { new: true };
    const result = await Employee.findOneAndUpdate(filter, update, options);
    if (result) {
      res.send(result);
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      res
        .status(400)
        .send("Employee with that email or employeeId already exists");
    } else {
      throw err;
    }
  }
});

// Delete an employee
app.delete("/employee/:id", (req, res) => {
  const id = req.params.id;
  Employee.findOneAndDelete({ $or: [{ employeeId: id }, { email: id }] }).exec(
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.send("Employee deleted");
      } else {
        res.status(404).send("Employee not found");
      }
    }
  );
});

// List all employees
app.get("/employee", async (req, res) => {
  try {
    const result = await Employee.find().exec();
    res.send(result);
  } catch (err) {
    throw err;
  }
});

const port = process.env.PORT || 8181;
app.listen(port, () => console.log(`Server listening on port ${port}`));
