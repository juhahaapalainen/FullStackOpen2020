import {
  useSubscription, useApolloClient
} from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import RecommendedBooks from './components/RecommendedBooks'
import  {ALL_BOOKS, BOOK_ADDED} from './quories'


const Notify =({errorMessage}) => {
  if(!errorMessage) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const loggedUSer = localStorage.getItem('libusertoken')
    if(loggedUSer) {
      setToken(loggedUSer)
    }
  }, [setToken])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      set.map(p => p.id).includes(object.id)  
    }
    // console.log('UPDATECACHE')
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    // console.log('DATAINSTORE:', dataInStore.allBooks)

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      // console.log('paivitetaan')
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      // console.log('USINGSUBSCRIPTION!')
      console.log(subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`Book added: ${addedBook.title}`)
      // console.log('ADDEDBOOK', addedBook)
      updateCacheWith(addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify =(message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    },10000)
  }

  if(!token) {
    return (
      <div>
        
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <Notify errorMessage={errorMessage} />
        <Authors
          show={page === 'authors' } 
        />
  
        <Books
          show={page === 'books'}
        />
  
        <Login
          show={page === 'login'}
          setToken={setToken}
          setError={notify}
        />
      </div>
    )

  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={logout}>logout</button>
        
      </div>

      <Notify errorMessage={errorMessage} />
      <Authors
        show={page === 'authors' } 
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />
      <RecommendedBooks
        show={page === 'recommendations'}
      />


    </div>
  )
}

export default App