import React from "react";
import "./styles.css";
import { evaluate } from "mathjs";

export default function App() {
  const handleClick = function (value) {
    const newExpression = expression.toString() + value;
    setExpression(newExpression);
  };
  const handlePercentage = function (value) {
    if (expression.toString() === "") {
      setExpression(expression.toString());
      return;
    } else {
      let val = evaluate(expression);

      const expCopy = expression;
      let res = "";
      for (let i = expCopy.length - 1; i >= 0; i--) {
        if (
          expCopy[i] === "+" ||
          expCopy[i] === "-" ||
          expCopy[i] === "*" ||
          expCopy[i] === "/" ||
          expCopy[i] === "^"
        ) {
          break;
        } else {
          res += expCopy[i];
        }
      }
      res = res.split("").reverse().join("");
      let newExpression = val - res + ((val - res) * res) / 100;
      setExpression(newExpression);
    }
  };
  const handleDecimal = function (value) {
    const newExpression = expression.toString() + value;
    setExpression(newExpression);
  };
  let res;
  const calculate = function () {
    try {
      res = evaluate(expression);
      setExpression(res);
    } catch (ex) {
      setExpression("error");
    }
  };
  let [expression, setExpression] = React.useState("");
  const clear = function () {
    setExpression("");
  };
  const backspace = function () {
    setExpression(expression.toString().slice(0, -1));
  };
  let [exp1, exp2, exp3, exp4] = [
    [1, 2, 3, "+"],
    [4, 5, 6, "-"],
    [7, 8, 9, "*"],
    [0, "(", ")", "/"]
  ];
  return (
    <>
      <div className="calculator-screen">
        <span> Calculator</span>
        <div className="screen">{expression}</div>
        <div className="button">
          {exp1.map((el) => (
            <button key={el} onClick={() => handleClick(el)}>
              {el}
            </button>
          ))}
          <br />
          {exp2.map((el) => (
            <button key={el} onClick={() => handleClick(el)}>
              {el}
            </button>
          ))}
          <br />
          {exp3.map((el) => (
            <button key={el} onClick={() => handleClick(el)}>
              {el}
            </button>
          ))}
          <br />
          {exp4.map((el) => (
            <button key={el} onClick={() => handleClick(el)}>
              {el}
            </button>
          ))}
          <br />

          <button onClick={clear}>Clear</button>
          <button onClick={backspace}>Backspace</button>
          <button onClick={() => handlePercentage("%")}>%</button>
          <button onClick={() => handleClick("^")}>^</button>
          <button onClick={() => handleDecimal(".")}>.</button>

          <button onClick={calculate}>=</button>
        </div>
      </div>
    </>
  );
}
