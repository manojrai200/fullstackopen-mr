import { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({persons, setPersons, setMessage}) => {

    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setPhoneNumber] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!newName.trim() || !newPhoneNumber.trim()) {
            alert('Please fill in both name and phone fields');
            return;
        }

        const obj = {
        name: newName,
        number: newPhoneNumber
        }

        if(persons.some(person => person.name === newName)){
            if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
                let person = persons.find(person => person.name === newName)
                let id = person.id
                let updatedPerson = {...person, number: newPhoneNumber}
                
                personService.update(id, updatedPerson)
                    .then(response => {
                        setPersons(persons.map(person => person.id ===  id ? response.data : person))
                    })
            }
        }else{
                personService.create(obj)
                    .then(response => {
                    setPersons(persons.concat(response.data))
                    setMessage(`Added ${newName}`)

                    setNewName('')
                    setPhoneNumber('')
                    setTimeout(() => {
                        setMessage(null)
                    }, 2000)
                })

        }



    }

    return (
        <div>
            <form onSubmit={handleSubmit}> 
            <div>
                name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
            </div>
            <div>
                number: <input value={newPhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
            </form>
        </div>
    )
}

export default PersonForm