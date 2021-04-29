
import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import {ALL_BOOKS, } from '../quories'
import './Books.css'

const Books = (props) => {

  const result = useQuery(ALL_BOOKS)
  // const user = useQuery(GET_USER)
  const [filter, setFilter] = useState('all')

  // console.log(user)

  if (!props.show) {
    return null
  }
  if (result.loading)  {
    return <div>loading...</div>
  }
  const books = result.data.allBooks
  let sortedBooks = books
  
  // console.log(books)

  books.map(book => console.log(book.genres))
  let genresTemp = []
  books.map(book => {
    genresTemp.push(...book.genres)
  })
  const genres = [...new Set(genresTemp)]
  // console.log('GENRES', genres)

  const sortBooks = (gnr) => {
    // console.log('GNR', gnr)
    setFilter(gnr)
  }

  if(filter != 'all') {
    sortedBooks = books.filter(book => book.genres.includes(filter))
  }
  else {
    sortedBooks = books
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{filter}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
            
          </tr>
          {sortedBooks.map(a =>
            <tr key={a.title}>
              <td key="title">{a.title}</td>
              <td key="authorname">{a.author.name}</td>
              <td key="published">{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(genre =>
        <button key={genre} 
          onClick={() => sortBooks(genre)}
          className={genre === filter ? 'pressed' :'normal' }
        >{genre}</button>
      )}
      <button key="all" 
        onClick={() => sortBooks('all')}
        className={'all' === filter ? 'pressed' :'normal' }
      >show all genres</button>
    </div>
  )
}

export default Books