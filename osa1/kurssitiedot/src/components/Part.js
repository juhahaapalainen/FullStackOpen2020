import React from "react";

const Part = (props) => {
  //   console.log("part:", props.part, props.exercises);
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  );
};

export default Part;
