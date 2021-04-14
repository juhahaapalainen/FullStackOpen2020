import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import {CoursePart} from "../types"

const Part = ({ coursePart }: { coursePart: CoursePart }) => {

    switch(coursePart.type) {
        case "normal": {
            return (
                <div>
                <h3>Name: {coursePart.name}</h3>
                <p>Exercise Count: {coursePart.exerciseCount}</p>
                </div>
            )
        }
        case "groupProject": {
            return (
                <div>
                <h3>Name: {coursePart.name}</h3>
                <p>Exercise Count: {coursePart.exerciseCount}</p>
                <p>Group project count: {coursePart.groupProjectCount}</p>
                </div>
            )
        }
        case "submission": {
            return (
                <div>
                <h3>Name: {coursePart.name}</h3>
                <p>Exercise Count: {coursePart.exerciseCount}</p>
                <p>Submit to: {coursePart.exerciseSubmissionLink}</p>
                </div>
            )
        }
        case "special": {
            return (
                <div>
                <h3>Name: {coursePart.name}</h3>
                <p>Exercise Count: {coursePart.exerciseCount}</p>
                <p>Requirements: {coursePart.requirements.map((req,i) =>
                    <React.Fragment key={i}>{req},</React.Fragment>)}</p>
                </div>
            )
        }
        default: {
            return <div></div>
          }
    }
    
   
}

  
export default Part