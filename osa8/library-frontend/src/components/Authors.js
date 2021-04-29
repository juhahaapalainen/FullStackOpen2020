import { useQuery, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import {ALL_AUTHORS, EDIT_BORN} from '../quories'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [setBornTo, setSetBornTo] = useState('')
  const [editBorn] = useMutation(EDIT_BORN, {
    refetchQueries:[{query: ALL_AUTHORS}]
  })

  if (!props.show) {
    return null
  }
  if (result.loading)  {
    return <div>loading...</div>
  }
  const authors = result.data?.allAuthors
  const authorNames = authors.map(author => {return author.name})

  const submit = async (event) => {
    event.preventDefault()
    
    console.log('edit author', setBornTo)
    // var pubInt = parseInt(published)
    editBorn({variables: {name, setBornTo}})
    setName('')
    setSetBornTo('')
  }
  
  const handleChange = (event) => {
    // event.preventDefault()
    console.log(event.target.value)
    setName(event.target.value)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            <select value={name} onChange={handleChange}>
              {authorNames.map((aName,key) => <option key={key}>{aName}</option>)}
            </select>
          </div>
        
          <div>
          born
            <input
              type='number'
              value={setBornTo}
              onChange={({ target }) => setSetBornTo(parseInt(target.value))}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors