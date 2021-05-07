import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Input, List } from 'semantic-ui-react'
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
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')
  console.log(countries)

  const filterCountries = () => {

    const filt= countries.filter((c) => {
        return( c.name.toLowerCase().includes(searchFilter.toLowerCase()))
    } )
    console.log(filt.length)
    if(filt.length > 10) {
        setTooMany(true)
        setShowDetails(false)
        setFilteredCountries(filt)
    }
    else {
        console.log('ei montaa')
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


  console.log(searchFilter)
  console.log('toomany',tooMany)
//   console.log(filterCountries())
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
                 
                    <List.Item as='li' key={i}>{c.name}</List.Item>
                 
             )})}
         </List>
        
        }
        

        </div>        

    )
}

export default CountrySearch