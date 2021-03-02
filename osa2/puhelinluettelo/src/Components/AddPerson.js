import React from "react";

const AddPerson = ({
  handleNameChange,
  handleNumberChange,
  addPerson,
  newName,
  newNumber,
}) => {
  //console.log("AddPersonista: ", newName, newNumber);
  return (
    <form onSubmit={addPerson}>
      <div>
        name:{" "}
        <input
          type="text"
          name="name"
          value={newName}
          onChange={(e) => handleNameChange(e.target.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          type="text"
          name="number"
          value={newNumber}
          onChange={(e) => handleNumberChange(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default AddPerson;
