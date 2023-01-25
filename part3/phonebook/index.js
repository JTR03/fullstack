const express = require("express")
const app = express()

let phonebook = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get('/api/people',(req,res) => {
    res.json(phonebook)
})

app.get('/info', (req,res) => {
  res.send(`<p>They are ${phonebook.length} people in the phone</p> <p>${new Date(Date.now())} </p>`)
})

const PORT = 3001
app.listen(PORT, ()=>{
  console.log(`listening on port ${PORT}`)
})
