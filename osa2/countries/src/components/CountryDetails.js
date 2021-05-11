import React from 'react'
import { Container, Divider, Header, Image } from 'semantic-ui-react'
import GetWeather from './GetWeather'



const CountryDetails = ({country}) => {

   
  // console.log(country)
    return (
        
  <Container textAlign='right'>
        {country.map((c,i) =>

         <Container textAlign='center' key={i}>
        <Header as='h1'>{c.name}</Header>
        <Divider/>
         <div>Capital: {c.capital}</div>
         <div>Population: {c.population}</div>
         <Header as='h2'>languages</Header>
    
         {c.languages.map((l,i)=>
            <li key={i}>{l.name}</li>)}
        
        <Divider/>
        <img src={c.flag} alt="flag" height="20%" width="20%"></img>
        {/* {<Image src={c.flag} size='mini'/>} */}
        {c.capital ? <GetWeather city={c.capital}/>:<div>cannot get weather</div>}
          
        </Container>
         )}

         
        </Container>
        
      
       
        

         
             

    )
}

export default CountryDetails