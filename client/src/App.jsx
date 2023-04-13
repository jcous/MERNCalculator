import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { evaluate } from 'mathjs';

function App() {
  const [calculation, setCalculation] = useState('');
  const [result, setResult] = useState('');
  const [calculations, setCalculations] = useState([]);
  const [arithmeticResult, setArithmeticResult] = useState('');

  const calculate = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/calculations', { calculation });
      setResult(res.data.result);
  
      // Evaluate the expression as a string
      const result = evaluate(calculation);
      const arithmeticResult = isNaN(result) ? '' : `= ${result}`;
      setArithmeticResult(arithmeticResult);
  
      setCalculation('');
      const calcRes = await axios.get('http://localhost:5000/api/calculations');
      setCalculations(calcRes.data);
      const postRes = await axios.post('http://localhost:5000/api/calculations', { calculation, result });
      setCalculations([...calculations, postRes.data]);
      console.log(postRes);
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className="App">
      <div className="calculator">
        <div className="input-row">
          <input type="text" value={calculation} onChange={e => setCalculation(e.target.value)} />
          <button onClick={calculate}>Calculate</button>
        </div>
        <div className="button-row">
          <button onClick={() => setCalculation(calculation + "7")}>7</button>
          <button onClick={() => setCalculation(calculation + "8")}>8</button>
          <button onClick={() => setCalculation(calculation + "9")}>9</button>
          <button onClick={() => setCalculation(calculation + "+")}>+</button>
        </div>
        <div className="button-row">
          <button onClick={() => setCalculation(calculation + "4")}>4</button>
          <button onClick={() => setCalculation(calculation + "5")}>5</button>
          <button onClick={() => setCalculation(calculation + "6")}>6</button>
          <button onClick={() => setCalculation(calculation + "-")}>-</button>
        </div>
        <div className="button-row">
          <button onClick={() => setCalculation(calculation + "1")}>1</button>
          <button onClick={() => setCalculation(calculation + "2")}>2</button>
          <button onClick={() => setCalculation(calculation + "3")}>3</button>
          <button onClick={() => setCalculation(calculation + "*")}>*</button>
        </div>
        <div className="button-row">
          <button onClick={() => setCalculation(calculation + "0")}>0</button>
          <button onClick={() => setCalculation(calculation + ".")}>.</button>
          <button onClick={() => setCalculation(calculation + "/")}>/</button>
          <button onClick={() => {
            setCalculation("");
            setResult("");
            }}>AC</button>
        </div>
        <div className="result-row">
          <p>Result: {result}</p>
          <p>Arithmetic Result: {arithmeticResult}</p>
        </div>
      </div>
      <div className="history">
        <h2>Last 10 calculations:</h2>
        <ul>
          {calculations.map(calc => (
            <li key={calc._id}>{calc.calculation} = {evaluate(calc.calculation)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;