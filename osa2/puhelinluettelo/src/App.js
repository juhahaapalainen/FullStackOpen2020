import React, { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import AddPerson from "./Components/AddPerson";
import Persons from "./Components/Persons";
import personService from "./services/personService";
import Notification from "./Components/Notification";
import ErrorNotification from "./Components/ErrorNotification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
    const korvattava = persons.find((nimi) => nimi.name === newName);

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((nimi) => nimi.name === newName)) {
      //alert(`${newName} is already added to phonebook`);
      //console.log(korvattava);
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        //console.log("Update ", korvattava);

        personService
          .update(korvattava.id, personObject)

          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== korvattava.id ? person : returnedPerson
              )
            );

            setNewName("");
            setNewNumber("");
            setMessage(
              `Person '${korvattava.name}' phone number changed on server`
            );
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            //console.log("Persons", persons);
            // console.log("Temp", temp);
          })
          .catch((error) => {
            setErrorMessage(
              `Person '${newName}' was already removed from server`
            );
            //console.log("Error muutoksesta", error);
            setPersons(persons.filter((person) => person.id !== korvattava.id));
          });
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    } else {
      personService
        .create(personObject)

        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setMessage(`Added '${returnedPerson.name}'`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
    //console.log("Persoonat", persons);
    // console.log("Persons", persons);
  };

  const deletePerson = (event, id, name) => {
    event.preventDefault();
    //console.log("Poista id: ", id);

    if (window.confirm(`Delete ${name} ?`)) {
      //console.log("Poistetaan");
      personService
        .deletePers(id)
        .then(setPersons(persons.filter((person) => person.id !== id)))

        .catch((error) => {
          setErrorMessage(`Person '${name}' was already removed from server`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });

      setMessage(`Person '${name}' removed from server`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } else {
      console.log("Perutaan poisto");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorNotification message={errorMessage} />

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
