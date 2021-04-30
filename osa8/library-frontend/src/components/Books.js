
import { useLazyQuery, } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {ALL_BOOKS, } from '../quories'
import './Books.css'

const Books = (props) => {
  
  const [getBooks, {loading, error, data}] = useLazyQuery(ALL_BOOKS)
  // const user = useQuery(GET_USER)
  const [genre, setGenre] = useState('all')
  const [books, setBooks] = useState([])
  // console.log(user)

  useEffect(() => {
    if(genre === 'all') {
      getBooks()
    }else {
      getBooks({variables: {genre}})
    }
  }, [getBooks, genre])

  useEffect(() => {
    if(data) {
      setBooks(data.allBooks) 
    }
  }, [setBooks, data])

  if (!props.show) {
    return null
  }
  if (loading)  {
    return <div>loading...</div>
  }
  if(error) {
    console.log('error', error)
    return <div>error</div>
  }
  // const books = result.data.allBooks
  // let sortedBooks = books
  
  // console.log(books)

  // books.map(book => console.log(book.genres))
  let genresTemp = []
  books.map(book => {
    genresTemp.push(...book.genres)
  })
  const genres = [...new Set(genresTemp)]
  // console.log('GENRES', genres)

  // const sortBooks = (gnr) => {
  //   // console.log('GNR', gnr)
  //   setFilter(gnr)
  // }

  // if(filter != 'all') {
  //   sortedBooks = books.filter(book => book.genres.includes(filter))
  // }
  // else {
  //   sortedBooks = books
  // }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{genre}</b></p>
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
          {books.map(a =>
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
          onClick={() => setGenre(genre)}
          className={genre === genre ? 'pressed' :'normal' }
        >{genre}</button>
      )}
      <button key="all" 
        onClick={() => setGenre('all')}
        className={'all' === genre ? 'pressed' :'normal' }
      >show all genres</button>
    </div>
  )
}

export default Books