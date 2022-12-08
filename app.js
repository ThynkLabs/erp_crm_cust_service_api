const express = require('express');
const app = express();
require('dotenv').config();
require('./DB/connection');
const {Ticket} = require('./routes/index');
app.use(express.json());
app.use(Ticket);

app.listen(process.env.PORT, async () => {
    console.log('server is running on this port', process.env.PORT);
})