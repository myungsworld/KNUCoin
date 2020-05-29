const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
    secret: 'knucoin',
    resave: false,
    saveUninitialized: true
}))

app.use('/api', require('./api'))

module.exports = app