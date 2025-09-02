import ShowCountry from "./showCountry"

const Countries = ({ filter, countries, setShowCountry }) => {
  if(filter){
    if (countries.length > 10) {
      return 'Too many matches, specify another filter'
    }

    if (countries.length > 1) {
      return (
        <div>
          {countries.map(country => (
            <div key={country.cca3}>
              {country.name.common} <button onClick={() => {setShowCountry(country)}} >show</button>
            </div>
          ))}
        </div>
      )
    }

    if (countries.length === 1) {
      return <ShowCountry country={countries[0]} />
    }
  }
  }


export default Countries