const mongoose = require('mongoose');

const ticket = new mongoose.Schema({
    Phone: String,
    Issue: String,
    Status: {type:String, default: "Pending" }
},{timestamps: true})

const Ticket = mongoose.model('Ticket', ticket);

module.exports = Ticket;