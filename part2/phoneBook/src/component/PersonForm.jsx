import { useState } from 'react'

const PersonForm = ({persons, setPersons}) => {

    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setPhoneNumber] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!newName.trim() || !newPhoneNumber.trim()) {
            alert('Please fill in both name and phone fields');
            return;
        }

        if(persons.some(person => person.name === newName)) return alert(`${newName} is already added to phonebook`)
        const obj = {
        name: newName,
        number: newPhoneNumber
        }

        setPersons([obj, ...persons])
        setNewName('')
        setPhoneNumber('')

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