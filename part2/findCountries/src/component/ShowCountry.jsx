import { useEffect, useState } from "react"
import axios from "axios"


const apiKey = import.meta.env.VITE_SOME_KEY

const ShowCountry = ({ country }) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
  })
    
  if(!country) return null
  return(
    <div>
      <h1>{country.name.common}</h1>
      <div>
        Capital {country.capital}<br />
        Area {country.area}
      </div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(lang => (
        <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common} width="120" />
      <h2>Weater in {country.capital}</h2>
      <img src={weather.weather[0].icon} width='120' />
    </div>
  )
}

export default ShowCountry