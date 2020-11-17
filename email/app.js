
const fs = require("fs")
const bodyParser = require("body-parser")
const db = require('./queries')

const express = require('express')
const app = express()
const port = 3001


app.use(bodyParser.json())

app.get('/emails', db.getEmails)
app.get('/emails/:id', db.getEmailById)

app.get('/search', db.searchEmails);

app.post('/send', db.sendEmail);


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))