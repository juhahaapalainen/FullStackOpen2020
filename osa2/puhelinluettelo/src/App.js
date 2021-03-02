import React, { useState } from "react";
import Filter from "./Components/Filter";
import AddPerson from "./Components/AddPerson";
import Persons from "./Components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1231244" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const handleNameChange = (newName) => {
    console.log("handleInputChange", newName);
    setNewName(newName);
  };
  const handleNumberChange = (newNumber) => {
    //console.log("handleInputChange", event.target.value);
    setNewNumber(newNumber);
  };

  const addPerson = (event) => {
    event.preventDefault();
    //console.log("Nappia painettu", event.target, newName);

    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((nimi) => nimi.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }

    // console.log("Persons", persons);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filter} handleFilter={handleFilter} />

      <h3>add a new</h3>

      <AddPerson
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
