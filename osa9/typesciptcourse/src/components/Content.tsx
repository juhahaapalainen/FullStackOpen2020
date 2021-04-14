import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import Part from "./Part";
import {CoursePart} from "../types"


const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (
    <div>
      {courseParts.map((part, i) => {
          return <Part key={i} coursePart={part} />;
      })}
    </div>
  );

  
export default Content