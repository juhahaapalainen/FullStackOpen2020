import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = (props) => {
    setGood(good + 1);
  };
  const handleClickNeutral = (props) => {
    setNeutral(neutral + 1);
  };
  const handleClickBad = (props) => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => handleClickGood()} text="good" />
      <Button handleClick={() => handleClickNeutral()} text="neutral" />
      <Button handleClick={() => handleClickBad()} text="bad" />
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
};

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0)
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine name="good" value={props.good} />
          <StatisticLine name="neutral" value={props.neutral} />
          <StatisticLine name="bad" value={props.bad} />
          <StatisticLine
            name="all"
            value={props.good + props.neutral + props.bad}
          />
          <StatisticLine
            name="average"
            value={
              (props.good - props.bad) /
              (props.good + props.neutral + props.bad)
            }
          />
          <StatisticLine
            name="positive"
            value={
              (props.good / (props.good + props.neutral + props.bad)) * 100
            }
            pros="%"
          />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = (prop) => {
  return (
    <tr>
      <td>{prop.name}</td>
      <td>
        {prop.value} {prop.pros}
      </td>
    </tr>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

ReactDOM.render(<App />, document.getElementById("root"));
