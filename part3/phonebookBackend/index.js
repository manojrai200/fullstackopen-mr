require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const morgan = require("morgan")
const cors = require("cors")
const person = require('./models/person')
const app = express()

app.use(cors())
app.use(express.json())
// app.use(express.static("dist"))

morgan.token('body', function (request, response) { return JSON.stringify(request.body) })
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const now = new Date
    const length = 0
    Person.find({}).then(persons => {
        response.send(
            `<div>Phonebook has info for ${persons.length} people</div>
            <div>${now}</div>
            `)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    // const id = request.params.id
    // const note = persons.find((note) => note.id === id)

    // if (note) {
    //     response.json(note)
    // } else {
    //     response.status(404).end()
    // }

    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(error => {
        next(error)
    })
})

const generateId = () => {
    return String(Math.floor(Math.random()*1e9))
}
app.post('/api/persons', (request, response) => {
    const body = request.body

    // if (!body.name || !body.number) {
    //     return response.status(400).json({
    //     error: 'name or number is missing',
    // })
    // }else if(persons.some(person => person.name === body.name)){
    //     return response.status(400).json(
    //         {error: 'name must be unique'}
    //     )
    // }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    // const id = request.params.id
    // persons = persons.filter((person) => person.id !== id)

    // response.status(204).end()
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    // const id = request.params.id
    // const { name, number } = request.body

    // const person = persons.find(person => person.id === id)
    // if(!person){
    //     return next()
    // }

    // person.number = number
    // response.json(person)
    const { name, number } = request.body

    Person.findById(request.params.id)
        .then(person => {
            if (!person){
                return response.status(404).end()
            }

            person.name = name
            person.number = number

            return person.save().then((updatedPerson) => {
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})

const unKnownEndPoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}
app.use(unKnownEndPoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if(error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})