import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {ME, BOOKS_BY_GENRE} from '../quories'
import './Books.css'

const RecommendedBooks = (props) => {

  //   const result = useQuery(ALL_BOOKS)
  const user = useQuery(ME)
  const [genreBooks, result] = useLazyQuery(BOOKS_BY_GENRE)
  //   const [filter, setFilter] = useState('all')
  const [recommendedBooks, setRecommendedBooks] = useState([])

  //   const books = result.data.allBooks
  //   const favoriteGenre = user.data.me.favoriteGenre
  //   let sortedBooks = books.filter(book => book.genres.includes(favoriteGenre))

  useEffect(() => {
    if(result.data) {
      console.log('allbookd', result.data.allBooks)
      setRecommendedBooks(result.data.allBooks)
    }
  }, [setRecommendedBooks, result])

  useEffect(() => {
    if(user.data) {
      genreBooks({variables: {genre: user.data.me.favoriteGenre}})
    }
  }, [genreBooks, user])

  if (!props.show) {
    return null
  }
  if (result.loading)  {
    return <div>loading...</div>
  }
  
  //   console.log('recbooks:' ,recommendedBooks)

  //   console.log('USER', user.data.me)
  //   console.log(user.data.me.username)
  //   console.log(books)

  //   books.map(book => console.log(book.genres))
  //   let genresTemp = []
  //   books.map(book => {
  //     genresTemp.push(...book.genres)
  //   })
  //   const genres = [...new Set(genresTemp)]
  // console.log('GENRES', genres)

  //   const sortBooks = (gnr) => {
  //     // console.log('GNR', gnr)
  //     setFilter(gnr)
  //   }

  // sortedBooks = books.filter(book => book.genres.includes(filter))
  
  

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{user.data.me.favoriteGenre}</b></p>
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
          {recommendedBooks.map(a =>
            <tr key={a.title}>
              <td key="title">{a.title}</td>
              <td key="authorname">{a.author.name}</td>
              <td key="published">{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendedBooks