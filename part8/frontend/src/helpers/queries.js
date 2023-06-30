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
query books($genre: String, $author:String){
    allBooks(genre:$genre,author:$author) {
        title
        author
        published
        genres
    }
}
`
export const ADD_BOOK = gql `
mutation createBook($title: String!, $author: String!, $published: Int, $genres: [String!]!){
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

export const LOGIN = gql `
mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
        value
    }
}
`