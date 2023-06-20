import { useMutation } from '@apollo/client';
import React,{useState,useEffect} from 'react'
import { LOGIN } from '../helpers/queries';

const LoginForm = ({setError,setToken}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, result] = useMutation(LOGIN,{
        onError: (error) => {
            const message = error.graphQLErrors[0].message
            setError(message)
        }
    })

    useEffect(() => {
     if(result.data){
        const token = result.data.login.value
        setToken(token)
        localStorage.setItem('bookApp-token', token)
     }
    }, [result.data]);

    const submit = (e) => {
        e.preventDefault()
        login({variables:{username,password}})
    } 
  return (
    <div>
        <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
            Username: <input value={username} onChange={({target})=>setUsername(target.value)}/>
        </div>
        <div>
            Password: <input value={password} onChange={({target}) => setPassword(target.value)}/>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default LoginForm
