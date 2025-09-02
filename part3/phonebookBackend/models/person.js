const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URL

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    }).catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)

// const Person = mongoose.model('Person', phonebookSchema)

// if( process.argv.length === 3) {
//   Person.find({}).then(persons => {
//     console.log('phonebook:');
    
//     persons.forEach(person => {
//       console.log(`${person.name} ${person.number}`)
//     })

//     mongoose.connection.close()
//   })  
// }else{
//   const person = new Person({
//     name: process.argv[3],
//     number: process.argv[4],
//   })

//   person.save().then(result => {
//     console.log(`added ${result.name} ${result.number} to phonebook`)
//     mongoose.connection.close()
//   })

// }

