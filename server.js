const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const app = express()
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '9099',
      database : 'smart_brain'
    }
});

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {res.send('it is working!')})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db ,bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)} )
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

/**
 / --> res = server is running
 /signin --> POST = success/fail
 /register --> POST = user
 /profile/:userId --> GET = user
 /image --> PUT = user
 */