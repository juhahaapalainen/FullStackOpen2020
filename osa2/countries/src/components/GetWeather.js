import React, {useEffect, useState} from 'react'
import { Container, Header } from 'semantic-ui-react'
import axios from 'axios'


const GetWeather = (city) => {

    const [weather, setWeather] = useState({})

    console.log('City:', city.city)
    const params = {
     access_key: process.env.REACT_APP_API_KEY,
     query: city.city
    }
    

    
   useEffect(() => {
    console.log('effect weather')
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
      })
  }, [])

  console.log('saa',weather)
  
    return (
        <Container>
            <Header as='h2'>Weather in {city.city}</Header>
             <div><b>temperature:</b> {weather?.current?.temperature}</div>

            <img src={weather?.current?.weather_icons[0]} alt="weather_icon" height="10%" width="10%"></img>
            <div> <b>wind:</b> {weather?.current?.wind_speed}mph direction {weather?.current?.wind_dir}</div>
        </Container>
        
        
       

       
       
    )
}

export default GetWeather