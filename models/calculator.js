const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CalculatorSchema = new Schema({
  calculation: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Calculator = mongoose.model("calculator", CalculatorSchema);
