const express = require("express");
const router = express.Router();
const Calculator = require("../models/Calculator");

router.post("/", async (req, res) => {
  const { calculation, result } = req.body;
  const newCalculation = new Calculator({
    calculation,
    result,
  });
  await newCalculation.save();
  res.json(newCalculation);
});

router.get("/", async (req, res) => {
  const calculations = await Calculator.find()
    .sort({ createdAt: -1 })
    .limit(10);
  res.json(calculations);
});

module.exports = router;
