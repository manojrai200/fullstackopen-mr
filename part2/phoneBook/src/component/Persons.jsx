const Persons = ({filterPerson}) => {
    return (
        <>
            {filterPerson.map(person => 
                <div>
                    {person.name} {person.number}
                </div>
            )}
        </>
    )
}

export default Persons