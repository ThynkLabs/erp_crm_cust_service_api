const express = require('express');
const app = express();
require('dotenv').config();
require('./DB/connection');
const { Ticket } = require('./routes/index');
app.use(express.json());
app.use(Ticket);

module.exports = { app };