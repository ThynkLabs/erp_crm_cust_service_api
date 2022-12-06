const route = require('express').Router();
const {createTicket,getTickets,filterTicket} = require('../controller/tickets');

route.post('/createTicket', createTicket);
route.get('/getTicket', getTickets);
route.get('/filter', filterTicket);

module.exports = {
    Ticket: route
}