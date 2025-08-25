const express = require('express')
const morgan = require("morgan")

const app = express()

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

morgan.token('body', function (request, response) { return JSON.stringify(request.body) })

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const now = new Date
    response.send(
        `<div>Phonebook has info for ${persons.length} people</div>
         <div>${now}</div>
        `)
})


app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const note = persons.find((note) => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    return String(Math.floor(Math.random()*1e9))
}



app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
        error: 'name or number is missing',
    })
    }else if(persons.some(person => person.name === body.name)){
        return response.json(
            {error: 'name must be unique'}
        )
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    response.json({ received: body })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter((person) => person.id !== id)

    response.status(204).end()
})

const unKnownEndPoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unKnownEndPoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})