import { useEffect, useState } from 'react'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import personService from './services/persons'
import Notification from './component/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [persons])

  const [searchTerm, setSearchTerm] = useState('');


  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} />


      <h2>Numbers</h2>
      <Persons filterPerson={filteredPersons} />
    </div>
  )
}

export default App