import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1/all'

const getAll = () => {
    const request = axios.get(baseUrl)
    
    return request.then(res => console.log(res.data))
}

export default getAll