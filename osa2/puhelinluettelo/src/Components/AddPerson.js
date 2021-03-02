import React from "react";

const AddPerson = ({ handleNameChange, handleNumberChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:{" "}
        <input
          type="text"
          name="name"
          onChange={(e) => handleNameChange(e.target.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          type="text"
          name="number"
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
