import personService from '../services/persons'

const Persons = ({person, persons, setPersons}) => {
  const hanldeDelete = () => {
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
      {person.name} {person.number} <button onClick={hanldeDelete}>delete</button>
    </div>
  )
}

export default Persons