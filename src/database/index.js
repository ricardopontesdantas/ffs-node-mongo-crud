const mongoose = require('mongoose')

function connect() {
    mongoose.connect('mongodb://localhost:27017/crud-project?readPreference=primary&ssl=false&directConnection=true')

    const db = mongoose.connection

    db.once('open', () => console.log('Connected to database'))
    db.on('error', () => console.error.bind(console, 'Connection error: '))
}

module.exports = { connect }
