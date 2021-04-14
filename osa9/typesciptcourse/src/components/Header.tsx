import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

const Header = ({courseName}: { courseName: string}) => {
  return <h1>{courseName}</h1>;
};

const element = <Header courseName="'Test'" />;
ReactDOM.render(element, document.getElementById("root"));

export default Header