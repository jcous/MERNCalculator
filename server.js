const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const calculationsRouter = require("./api/calculations");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  "mongodb+srv://jcousens:nGgWMrWXZgzho2Nu@cluster0.kzy8fwh.mongodb.net/calculator?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const calculationSchema = new mongoose.Schema(
  {
    calculation: String,
  },
  { timestamps: true }
);

const Calculation = mongoose.model("Calculation", calculationSchema);

app.use("/api/calculations", calculationsRouter);

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});

module.exports = app;
