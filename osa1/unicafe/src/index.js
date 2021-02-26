import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = () => {
    console.log("Painettu");
    setGood(good + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={handleClick} type="button">
        good
      </button>
      <button onClick={handleClick} type="button">
        neutral
      </button>
      <button onClick={handleClick} type="button">
        bad
      </button>
      <p>{good}</p>
      <p>{neutral}</p>
      <p>{bad}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
