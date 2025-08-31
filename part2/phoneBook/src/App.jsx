import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import Notification from './component/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [searchName, setSearchName] = useState('')
  const filterpersons = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
  const [message, setMessage] = useState(null)
  const [sucess, setSuccess] = useState(false);
  const [error, setError] = useState(false)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} success={sucess} error={error} />
      <Filter searchName={searchName} setSearchName={setSearchName} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} setSuccess={setSuccess} setError={setError} />
      <h2>Numbers</h2>
      <div>
        {filterpersons.map(person =>
          <Persons key={person.id} person={person} persons={persons} setPersons={setPersons} />
        )}
      </div>
    </div>
  )
}

export default App