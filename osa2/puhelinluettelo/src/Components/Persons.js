import React from "react";

const Persons = (props) => {
  //console.log("Persons filter ", props.filter);
  return (
    <div>
      <div>
        {props.persons
          .filter((suodatin) => suodatin.name.includes(props.filter))
          .map((person) => (
            <div key={person.name}>
              {person.name} {person.number}{" "}
            </div>
          ))}
      </div>
    </div>
  );
};
export default Persons;
