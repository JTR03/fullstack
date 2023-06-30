const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
const User = require('./models/user')
const Book = require('./models/books')
const Author = require('./models/authors')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI).then(()=>{
  console.log('connected to DB');
}).catch((error) => {
  console.log('error connecting to DB:', error.message);
})


const typeDefs = `
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token{
  value: String!
}
  type Author {
    name: String!
    bookcount: Int!
    born: Int
  }

  type Book {
    title: String!
    author: String!
    published: Int
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(
      author: String
      genre:String
      ): [Book!]!
    allAuthors: [Author!]
    booksByGenre(genre: String!): [Book]
    me: User
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

    addBook(
      title: String!
      author: String!
      published: Int
      genres:[String!]!
    ):Book!

    editAuthor(
      name: String!
      born: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async() => Book.collection.countDocuments(),
    authorCount: async() => Author.collection.countDocuments(),
    allBooks: async(root,args) => {
      if(!args.author && !args.genre){
        return Book.find({})
      }
      else if(args.genre){
        return Book.find({genres:args.genre})
      }
      return Book.find({author: args.author})
      
    },
    allAuthors: async()=>Author.find({}),
    me:async(root,args,{currentUser}) => currentUser,
  }
,
Author:{
  bookcount: (root) => Book.find({author: root.name}).countDocuments()
},
// Book: {
//   author: async (root)=>{
//     console.log(root)
//     return{
//       name:  root.author
      
//     }
    
//   }
// },


  Mutation: {
    createUser: async(root, args)=>{
      const user = new User({...args})
      try {
        user.save()
      } catch (error) {
        throw new GraphQLError('Failed to create user',{
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

    },
    login: async(root,args)=>{
      const user = await User.findOne({username: args.username})

      if(!user || args.password !== 'secret'){
        throw new GraphQLError('invalid credentials',{
          extensions:{
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          }

        })
      }
      const userToken = {
        username: user.username,
        id: user._id
      }
      return {
        value: jwt.sign(userToken,process.env.JWT_SECRET)
      }
    },
    addBook: async(root,args,{currentUser}) => {
      
      const author = new Author({name: args.author})
      const book = new Book({...args})

      if(!currentUser){
        throw new GraphQLError('Please login to complete this operation',{
          extensions:{
            code: 'BAD_USER_INPUT'
          }
        })
      }
      
      try {
        await author.save()
        await book.save()
        console.log('book added');
        
      } catch (error) {
        console.log('book not added');
        throw new GraphQLError('Saving book failed',{
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      

      return book
    },

    editAuthor: async (root, args,{currentUser}) => {
      if(!currentUser){
        throw new GraphQLError('Please login to complete this operation',{
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const author = await Author.findOne({name: args.name})
      author.born = args.born
      try {
        author.save()
      } catch (error) {
        throw new GraphQLError('could not save changes',{
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async({req,res})=>{
    const auth = req ? req.headers.authorization : null
    if(auth && auth.startsWith('Bearer ')){
      const decodeToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodeToken.id).populate('books')
      return {currentUser}
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})