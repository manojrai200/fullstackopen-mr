import personService from '../services/persons'

const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)){
        personService.deleted(person.id)
            .then(response => {
                response.data = {}
            })
    }
}

const Persons = ({filterPerson}) => {
    return (
        <>
            {filterPerson.map(person => 
                <div key={person.id}>
                    {person.name}
                    {person.number} 
                    <button onClick={() => handleDelete(person)}>delete</button> 
                </div>
            )}
        </>
    )
}

export default Persons