
const Persons = ({ filterpersons, hanldeDelete }) => {

  return (
    <div>
      {filterpersons.map((person, index) => 
        <div key={index}>
          {person.name} {person.number} 
          <button onClick={() => {hanldeDelete(person)}}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Persons