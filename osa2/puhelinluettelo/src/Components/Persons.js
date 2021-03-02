import React from "react";

const Persons = ({ deletePerson, persons, filter }) => {
  //console.log("Persons filter ", filter);
  return (
    <div>
      <div>
        {persons
          .filter((suodatin) => suodatin.name.includes(filter))
          .map((person) => (
            <div key={person.name}>
              {person.name} {person.number}
              <button
                name={person.name}
                onClick={(event) => deletePerson(event, person.id, person.name)}
              >
                delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Persons;
