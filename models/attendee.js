/** attendee.js **/

var Attendee = function(first, last, email) {
    this.firstName = first
    this.lastName = last
    this.emailAddress = email
    this.paid = false
}

module.exports = Attendee