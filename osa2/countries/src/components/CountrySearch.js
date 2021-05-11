import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Button, Input, List } from 'semantic-ui-react'
import CountryDetails from './CountryDetails'


const CountrySearch = () => {

    const [countries, setCountries] = useState([])
    const [searchFilter, setSearchFilter] = useState('')
    const [filteredCountries, setFilteredCountries] = useState([])
    const [tooMany, setTooMany] = useState(true)
    const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const filterCountries = () => {

    const filt= countries.filter((c) => {
        return( c.name.toLowerCase().includes(searchFilter.toLowerCase()))
    } )
    
    if(filt.length > 10) {
        setTooMany(true)
        setShowDetails(false)
        setFilteredCountries(filt)
    }
    else {
        
        setTooMany(false)
        setShowDetails(false)
        setFilteredCountries(filt)
    }
    if(filt.length === 1) {
        setShowDetails(true)
    }
    
  }

  const handleChange = (event) => {
    setSearchFilter(event.target.value)
    filterCountries()
  }

const showCountry = (event) => {
 
  const filt= countries.filter((c) => {
        return( c.name.toLowerCase().includes(event.target.value.toLowerCase()))
    } )
    setTooMany(false)        
    setShowDetails(true)
    setFilteredCountries(filt)
}
    return (
        <div>
        <div>countries:</div>

        <Input 
            placeholder='search'
            value={searchFilter}
            onChange={handleChange}
        />
        {tooMany ? 
        'Too many to show' :
        showDetails ?
         <CountryDetails country={filteredCountries}/> :
         <List>
              {filteredCountries.map((c,i) => {
             return(
                 
                    <List.Item as='li' key={i}>{c.name}
                    <Button className={c.name} value={c.name} onClick={showCountry}>show</Button>
                    </List.Item>
                 
             )})}
         </List>
        
        }
        

        </div>        

    )
}

export default CountrySearch