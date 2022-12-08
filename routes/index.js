const route = require('express').Router();
const {createTicket,getTickets,filterTicket,updateTicket} = require('../controller/tickets');

route.post('/createTicket', createTicket);
route.post('/updateTicket', updateTicket);
route.get('/getTicket', getTickets);
route.get('/filter', filterTicket);

module.exports = {
    Ticket: route
}