import React from "react";
import Part from "./Part";

const Content = (props) => {
  //console.log("contentista", props.course.parts);
  return (
    <div>
      <ul>
        {props.course.parts.map((part, id) => (
          <li key={id}>
            <Part part={part.name} exercises={part.exercises} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Content;
