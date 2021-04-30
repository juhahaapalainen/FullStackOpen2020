import { gql } from '@apollo/client'

export const BOOK_DETAILS  = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    author {
      name
    }
    
  }
`

export const AUTHOR_DETAILS = gql`
fragment AuthorDetails on Author {
    name
    born
    bookCount
}
`

export const ALL_AUTHORS  = gql`
  query{
      allAuthors {
        ...AuthorDetails
      }
  }
  ${AUTHOR_DETAILS}
`
export const ALL_BOOKS  = gql`
  query getAllBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) { 
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const EDIT_BORN = gql `
mutation createBook($name: String!, $setBornTo: Int) { 
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    ...AuthorDetails
  }
}
${AUTHOR_DETAILS}
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
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails   
    }
  }
  ${BOOK_DETAILS}
`

