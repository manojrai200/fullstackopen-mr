import personService from '../services/persons'



const Persons = ({person, persons, setPersons}) => {

    const handleDelete = (person) => {
        personService.deleted(person.id)
            .then(() => {
                const id = person.id
                window.confirm(`Delete ${person.name} ?`)
                setPersons(persons.filter(person => person.id !== id ))
            })
}

    return (
            <div >
                {person.name}
                {person.number} 
                <button onClick={() => handleDelete(person)}>delete</button> 
            </div>
    )
}

export default Persons