import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS} from './helpers/queries'
import { Route, Routes,Link } from 'react-router-dom'

const App = () => {
  const result = useQuery(ALL_AUTHORS)

  if(result.loading){
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <Link to={'/'}>Home</Link>
        <Link to={'/books'}>books</Link>
        <Link to={'/add'}>add book</Link>
      </div>
    <Routes>
      <Route path='/books' element={<Books />}/>
      <Route path='/' element={<Authors authors={result.data.allAuthors}/>} />
      <Route path='/add' element={<NewBook />}/>

    </Routes>
      

      

      
    </div>
  )
}

export default App
