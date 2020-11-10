import React from "react";
import "./styles.css";

export default function Keypad(props) {
  const { exp1, exp2, exp3, exp4, onClick } = props;
  return (
    <>
      <div className="button">
        {exp1.map((el) => (
          <button key={el} onClick={() => onClick(el)}>
            {el}
          </button>
        ))}
        <br />
        {exp2.map((el) => (
          <button key={el} onClick={() => onClick(el)}>
            {el}
          </button>
        ))}
        <br />
        {exp3.map((el) => (
          <button key={el} onClick={() => onClick(el)}>
            {el}
          </button>
        ))}
        <br />
        {exp4.map((el) => (
          <button key={el} onClick={() => onClick(el)}>
            {el}
          </button>
        ))}
        <br />
      </div>
    </>
  );
}
