import { useEffect, useState } from 'react'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import personService from './services/persons'
import Notification from './component/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(intialPerson => {
        setPersons(intialPerson)
      })
  }, [persons])

  const [searchTerm, setSearchTerm] = useState('');


  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} errorMessage={errorMessage}/>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h1>add a new</h1>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} setErrorMessage={setErrorMessage}/>


      <h1>Numbers</h1>
      <div>
        {filteredPersons.map(person =>
          <Persons key={person.id} person={person} />
        )}
      </div>
    </div>
  )
}

export default App