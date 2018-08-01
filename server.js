var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var Cloudant = require('@cloudant/cloudant')
var Attendee = require("./models/attendee.js")

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/check', (req, res) => {
    var newAttendee = new Attendee("David", "Okun", "david@okun.io")
    res.send(newAttendee)
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})