const route = require('express').Router();
const {createTicket,getTickets,filterTicket,updateTicket} = require('../controller/tickets');

route.post('/createTicket', createTicket);
route.patch('/updateTicket', updateTicket);
route.get('/getTicket', getTickets);
route.get('/filter', filterTicket);

module.exports = {
    Ticket: route
}