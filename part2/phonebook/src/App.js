import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [messageContent, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    personService.getAll()
      .then(personsList => {
        setFilteredPersons(personsList)
        setPersons(personsList)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  // Check if the person name was already added
  const nameAdded = (name) =>
    persons.some((person) => person.name === name)

  // Add a person to the list of names
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (nameAdded(newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const contactToUpdate = persons.find(person => person.name === newName)
        personService.update(contactToUpdate.id, newPerson)
        .then(updatedContact => {
          const updatedPersons = persons.map(
            person => person.id !== contactToUpdate.id
              ? person : updatedContact
          )
          setPersons(updatedPersons)
          setFilteredPersons(updatedPersons)
          showMessage(`Updated '${updatedContact.name}' in your phonebook.`, false)
          resetFields()
        })
        .catch(error => {
          showMessage(`'${contactToUpdate.name}' was not found`, true)
          setFilteredPersons(persons.filter(person => person.id !== contactToUpdate.id))
        })
      }
    }
    else {
      personService.create(newPerson)
      .then(newPersonObject => {
        setPersons(persons.concat(newPersonObject))
        setFilteredPersons(persons.concat(newPersonObject))
        showMessage(`Added '${newPersonObject.name}' to your phonebook.`, false)
        resetFields()
      })
      .catch(error => {
        setIsError(true)
        showMessage(`An error occurred while adding '${newPerson.name}'`)
      })
    }
  }

  const showMessage = (message, isError) => {
    setIsError(isError)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const resetFields = () => {
    setNewName('')
    setNewNumber('')
  }

  // Delete a contact logic
  const deletePerson = (id) => {
    const contactToDelete = persons.find(person => person.id === id)
    if (window.confirm(`delete ${contactToDelete.name}?`)) {
      personService.deleteContact(id).then(() => {
        const updatedPersons = persons.filter(person => person.id !== id)
        setPersons(updatedPersons)
        setFilteredPersons(updatedPersons)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={messageContent} isError={isError}/>
      <Filter searchValue={searchValue} setSearchValue={setSearchValue}
        persons={persons} setFilteredPersons={setFilteredPersons} />

      <h2>Add a new contact</h2>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App