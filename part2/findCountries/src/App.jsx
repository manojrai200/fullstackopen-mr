import { useEffect, useState } from "react"
import axios from "axios"
import FilterCountries from "./component/FilterCountries"
import Countries from "./component/Countries"
import ShowCountry from "./component/showCountry"

function App() {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState("")
  const [showCountry, setShowCountry] = useState(null)

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
      
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShowCountry(null)
  };



  if(!countries) return 'wait fetching countries'

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );


  return (
    <div>
      <FilterCountries filter={filter} handleFilterChange={handleFilterChange} />    
      {showCountry ? <ShowCountry country={showCountry} /> : <Countries countries={filteredCountries} setShowCountry={setShowCountry} filter={filter} />}
    </div>
  );
}

export default App;
