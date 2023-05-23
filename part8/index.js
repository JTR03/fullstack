const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', 
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz',
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]


let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]


const typeDefs = `
  type AllBooks {
    title: String
    author: String
    published: Int
    genres: [String]
  }

  type AllAuthors {
    name:String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(
      author: String
      genre:String
      ): [AllBooks]
    allAuthors: [AllAuthors]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres:[String!]!
    ):AllBooks

    editAuthor(
      name: String!
      born: Int!
    ): AllAuthors
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root,args) => {
      if(!args.author && !args.genre){
        return books
      }
      else if(args.genre){
        return books.filter(b => b.genres.includes(args.genre))
      }
      return books.filter(b => b.author === args.author)
      
    },
    allAuthors: ()=>authors,
  }
,
  AllAuthors: {
    bookCount: (root,args)=>{
      return {
        bookCount: books.filter(a => a.author === args.author).length
      }
    }
  },

  Mutation: {
    addBook: (root,args) => {
      if(authors.find(a => a.name !== args.author)){
        authors.concat({name: args.author})
      }
      const newBook = {...args}
      books.concat(newBook)

      return newBook
    },

    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if(!author){
        return null
      }

      const updateAuthor = {...author, born: args.born}
      authors = authors.map(a => a.name === args.name ? updateAuthor: a)
      return updateAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})