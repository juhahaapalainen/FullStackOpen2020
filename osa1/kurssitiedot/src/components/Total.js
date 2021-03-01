import React from "react";

const Total = (props) => {
  let summa = 0;
  props.course.parts.map((exer) => (summa += exer.exercises));

  const total = props.course.parts.reduce((s, p) => s + p.exercises, 0);

  return (
    <div>
      <h3>Total number of exercises {total}</h3>
    </div>
  );
};

export default Total;
