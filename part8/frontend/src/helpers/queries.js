import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
query {
    allAuthors {
      name
      born
    }
  }
`

export const ALL_BOOKS = gql `
query {
    allBooks {
        title
        author
        published
    }
}
`
export const ADD_BOOK = gql `
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres,
    ){
        title
        author
        published
    }
}
`

export const EDIT_BIRTH = gql`
mutation editBorn($name: String!, $born: Int!){
    editAuthor(name: $name, born: $born){
        name
        born
    }
}
`