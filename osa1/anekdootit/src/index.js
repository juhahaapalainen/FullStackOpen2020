import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);

  const [points, setPoints] = useState(
    Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0)
  );

  const handleRandom = (props) => {
    const rnd = Math.floor(Math.random() * Math.floor(6));

    console.log("random: ", rnd);
    setSelected(rnd);
  };

  const handleVote = (props) => {
    const copy = [...points];
    copy[props.selected] += 1;
    setPoints(copy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>has {points[selected]} votes</p>

      <div>
        <Button handleClick={() => handleVote({ selected })} text="vote" />
        <Button handleClick={() => handleRandom()} text="next anecdote" />
      </div>

      <div>
        <h1>Anecdote with most votes</h1>
        <MostVotes anecdotes={props.anecdotes} points={points} />
      </div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const MostVotes = (props) => {
  return (
    <div>
      {
        props.anecdotes[
          props.points.reduce(
            (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
            0
          )
        ]
      }
      <p>has {Math.max(...props.points)} votes</p>
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
