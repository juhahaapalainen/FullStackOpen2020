import React, { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import AddPerson from "./Components/AddPerson";
import Persons from "./Components/Persons";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService
      .getAll()

      .then((personData) => {
        // console.log("promise fulfilled");
        // console.log(response.data);
        setPersons(personData);
      });
  }, []);

  const handleFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const handleNameChange = (newName) => {
    //console.log("handleNameChange", newName);
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
      personService
        .create(personObject)

        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        });
    }

    // console.log("Persons", persons);
  };

  const deletePerson = (event, id, name) => {
    event.preventDefault();
    console.log("Poista id: ", id);

    if (window.confirm(`Delete ${name} ?`)) {
      console.log("Poistetaan");
      personService
        .deletePers(id)
        .then(setPersons(persons.filter((person) => person.id !== id)));
    } else {
      console.log("Perutaan poisto");
    }
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
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
