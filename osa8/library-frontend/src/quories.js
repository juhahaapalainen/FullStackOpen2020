import { gql } from '@apollo/client'

export const ALL_AUTHORS  = gql`
  query{
      allAuthors {
        name
        born 
        bookCount
      }
  }
`
export const ALL_BOOKS  = gql`
  query {
    allBooks { 
      title 
      author {
        name
      }
      published 
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!, 
    $author: String!, 
    $published: Int!, 
    $genres: [String!]!
    ){ 
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      published,
      genres
    }
  }
`

export const EDIT_BORN = gql `
mutation createBook($name: String!, $setBornTo: Int) { 
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name,
    born
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME= gql` 
query {
  me {
    username
    favoriteGenre
  }
}
`
export const BOOKS_BY_GENRE= gql` 
query getallBooks($genre: String!) {
  allBooks(genre: $genre) {
    title
    genres
    published
    author {
      name
    }
  }
}
`

