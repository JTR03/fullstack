import {useState} from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_AUTHORS} from './helpers/queries'
import { Route, Routes,Link } from 'react-router-dom'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  const handleError = (message) =>{
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000);
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()

  }

  if(result.loading){
    return <div>loading...</div>
  }

  if(!token){
    return(
      <div>
        <Notify error={errorMessage} />
        <LoginForm setError={handleError} setToken={setToken} />
      </div>
    )
  }

  return (
    <div>
      <Notify error={errorMessage}/>
      <div>
        <Link to={'/'}>Home</Link>
        <Link to={'/books'}>books</Link>
        <Link to={'/add'}>add book</Link>
        <button onClick={logout}>Logout</button>
      </div>
    <Routes>
      <Route path='/books' element={<Books />}/>
      <Route path='/' element={<Authors authors={result.data.allAuthors}/>} />
      <Route path='/add' element={<NewBook setError={handleError}/>}/>

    </Routes>
      

      

      
    </div>
  )
}

export default App
