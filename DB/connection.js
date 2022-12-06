const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.URL);
const con = async () => {
    try {
        await client.connect();
        if (client) console.log('db connected');
        else console.log(err);
    } catch (err) {
        console.log(err);
    }
}

const Ticket = client.db('Ticket').collection('Tickets');


module.exports = {
    con,
    Ticket
}