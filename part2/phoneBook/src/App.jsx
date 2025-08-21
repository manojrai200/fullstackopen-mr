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
      .then(intialPerson => {
        setPersons(intialPerson)
      })
  }, [])

  const [searchTerm, setSearchTerm] = useState('');


  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h1>add a new</h1>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} />


      <h1>Numbers</h1>
      <div>
        {filteredPersons.map(person =>
          <Persons key={person.id} person={person} persons={persons} setPersons={setPersons}/>
        )}
      </div>
    </div>
  )
}

export default App