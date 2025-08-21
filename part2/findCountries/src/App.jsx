import { useEffect, useState } from "react"
import axios from "axios";


function App() {
  const [countries, setCountries] = useState([])
  const [searchCountries, setSearchCountries] = useState('')

  useEffect(() => {


    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (e) => {
    setSearchCountries(e.target.value)
    const filteredCountries = countries.filter
  }

  
  return (
    <>
      find countries <input value={searchCountries} onChange={handleChange} />
      {countries.filter(country => country.name.common.includes(searchCountries))}
    </>

  )
}

export default App


