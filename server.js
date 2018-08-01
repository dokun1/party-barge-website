require('dotenv').load()
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var Cloudant = require('@cloudant/cloudant')
var Attendee = require("./models/attendee.js")

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

var username = process.env.cloudant_username || "nodejs"
var password = process.env.cloudant_password
var cloudant = Cloudant('http://localhost:5984')

app.get('/check', (req, res) => {
    var newAttendee = new Attendee("David", "Okun", "david@okun.io")
    res.send(newAttendee)
})

app.post('/newAttendee', (req, res) => {
    var newAttendee = new Attendee(req.body.firstName, req.body.lastName, req.body.emailAddress)
    console.log("body parsed: ", newAttendee)
    var db = cloudant.db.use('signup-testing')
    db.insert(newAttendee, (err, body, headers) => {
        if (err) {
            res.sendStatus(500)
            return console.error(err)
        } else {
            res.send(body)
        }
    })
})

cloudant.db.create("signup-testing", (err, body) => {
    if (err) {
        if (err.statusCode == 412) {
            console.log("Database already exists")
        } else {
            console.log("Error creating database:", err)
        }   
    }
})

cloudant.db.list((err, body) => {
    console.log("databases in existence:", body.join(', '))
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})