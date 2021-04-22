const express = require('express')
const app = express()

const { port } = require('./settings.json')

// Middlewares
app.use(express.json())

// Routes
app.use('/api', require('./routes/user.routes'))
app.use('/api', require('./routes/todo.routes'))

app.listen(port, () => {
    console.log(`started at ${port}`)
});
