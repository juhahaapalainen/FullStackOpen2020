const { ApolloServer, gql, AuthenticationError, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.SECRET
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })
console.log('connecting to', MONGODB_URI)


const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
 
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
      bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
       if(args.author && args.genre) {
        const foundAuthor = await Author.findOne({name: args.author})
        return await Book.find({ 
          $and: [ 
            {author: { $in: foundAuthor.id}},
            {genres: { $in: args.genre}}
          ]
        }).populate('author')
      }
       else if(args.author && !args.genre) {
        const foundAuthor = await Author.findOne({name: args.author})
        return await Book.find({  
          author: { $in: foundAuthor.id}
        }).populate('author')
     
      }
      else if(args.genre && !args.author) {       
        return await Book.find({  
          genres: { $in: args.genre}
        }).populate('author')
      }
       else {
        return await Book.find({}).populate('author')
       } 
    },
    allAuthors: () => {
      return Author.find({}).populate('books')
    
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: (root) => {
      return Book.countDocuments({author: root})
    }
  },
  

  Mutation: {
    addBook: async (root, args, context) => {

      const currentUser = context.currentUser

      if(!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const bookAlreadyMade = await Book.findOne({title: args.title})

      if(bookAlreadyMade) {
        throw new UserInputError('Book must be unique', {
          invalidArgs: args.title,
          
        })
      }
      let author = await Author.findOne({name: args.author})

      if(!author) {
        author = new Author({name: args.author})
        try{
          await author.save()
        }
        catch(error) {
          throw new UserInputError('Error creating new author', {
            invalidArgs: args.author,
          })
        }
      }
      const newBook = new Book({...args, author })
      try {
         await newBook.save()
         pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      }
      catch(error) {
        throw new UserInputError('Error creating new book', {
          invalidArgs: args,
        })
      }
      
      return newBook
    },
    

    editAuthor: async(root, args, context) => {

      const currentUser = context.currentUser

      if(!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const editedAuthor = await Author.findOne({name: args.name})
          
      if(!editedAuthor) {
        return null
      }

      editedAuthor.born =  args.setBornTo

      try {
        await editedAuthor.save()
      }
      catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      
      return editedAuthor
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },

  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})