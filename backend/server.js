require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const { errorHandler } = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

app.use(logger)

app.use(cors(corsOptions))

// this allows us to use json in the app.
app.use(express.json())

app.use(cookieParser())

// __dirname is a global var for "looking inside the folder we are in"
// express.static is middleware that tells the server where to grab static files.
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  }
  else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  }
  else {
    res.type('txt').send('404 not found')
  }
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

