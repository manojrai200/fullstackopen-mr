import { useState, useEffect } from "react"
import axios from "axios"

const apiKey = import.meta.env.VITE_SOME_KEY

const ShowCountry = ({ country }) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    if(!country.capital) return

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
  } , [country.capital])
    
  if(!weather) return null

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
      <img 
        src={country.flags.png} 
        alt={country.name.common} 
      />
      <h2>Weater in {country.capital}</h2>
      <p>Temprature {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} width='120'
        alt={weather.weather[0].main}
      />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default ShowCountry