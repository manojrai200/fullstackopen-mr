import { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({persons, setPersons, setMessage, setError, setSuccess }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber,
    }
    const sameNamePerson = persons.find(person => person.name === newName)
    if(sameNamePerson){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
          .update(sameNamePerson.id, personObj)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === sameNamePerson.id ? returnedPerson : person))
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
      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
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

  return(
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} required />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm