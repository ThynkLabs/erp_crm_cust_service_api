const { Ticket } = require('../DB/connection');
const createTicket = async (req, res) => {
    const {phone,issue} = req.body;
    try {
            const done = Ticket.insertOne({Phone: phone, Issue: issue, Status:"Pending", createdAt: new Date()});
            if (done) {
                res.send('Issue Created successfully');
            } else {
                res.send('error');
            }
    } catch (err) {
        console.log(err);
    }
}

const getTickets = (req, res) => {
    try {
        Ticket.find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    } catch (err) {
        console.log(err);
    }
}

const filterTicket = (req, res) => {
    const {status,sDate,eDate} = req.query;
    try {
        if (status) {
            Ticket.findOne({ Status: status }, function (err, result) {
                if (err) throw err;
                res.send(result);
            });
        }
        if (sDate) {
            
        }
    } catch (err) {
        console.log(err);
    }
}

// const updateTemplate = (req, res) => {   
//     const { template_id, title, Body } = req.body;
//     try {
//         const data = { Template_id: template_id }, value = { $set: { title: title, Body: Body } };
//         Template.updateOne(data, value, function (err, result) {
//             if (err) throw err;
//             res.send({ data: result.modifiedCount, msg: 'data updated successful' });
//         })
//     } catch (err) {
//         console.log(err);
//     }
// }


module.exports = {
    createTicket,
    getTickets,
    filterTicket
}