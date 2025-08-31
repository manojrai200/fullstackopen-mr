import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import Notification from './component/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState(null)
  const [sucess, setSuccess] = useState(false);
  const [error, setError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    const sameNamePerson = persons.find(person => person.name === newName)
    if(sameNamePerson){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const updatePerson ={
          ...sameNamePerson,
          number: newNumber
        }

        personService
          .update(sameNamePerson.id, updatePerson)
          .then(response => {
            setPersons(persons.map(person => person.id === sameNamePerson.id ? response.data : person))
            setNewName('')
            setNewNumber('')
            setMessage(`Added ${newName}`)
            setSuccess(true)
            setTimeout(() => {
              setSuccess(false)
            }, 5000)            
          })
          .catch(() => {
            setMessage(`Information of ${newName} has already been removed from server`)
            setError(true)
            setTimeout(() => {
              setError(false)
            }, 5000)
          })
      }
    }else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${newName}`)
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, 5000)   
        })
    }
  }

  const filterpersons = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  const hanldeDelete = (person) => {
    if(window.confirm(`Delete ${person.name}`)){
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
            console.error('Delete Failed:', error)
        })
    }

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={message} 
        success={sucess} 
        error={error} 
      />
      <Filter 
        searchName={searchName} 
        setSearchName={setSearchName} 
      />
      <h2>add a new</h2>
      <PersonForm 
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <div>
        <Persons
          filterpersons={filterpersons}
          hanldeDelete={hanldeDelete}
        />
      </div>
    </div>
  )
}

export default App