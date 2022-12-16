const Ticket = require('../DB/ticketSchema');
const createTicket = async (req, res) => {
    const {phone,issue} = req.body;
    try {
        var ticket = await Ticket.create({ Phone: phone, Issue: issue, updated_at:new Date()});
        ticket.save(function (err, result) {
            if (err) return res.send(err);
            res.status(200).send(result);
        });
    } catch (err) {
        res.send(err);
    }
}

const getTickets = (req, res) => {
    try {
        Ticket.find({}, function (err, docs) {
            if (err) res.send(err);
            res.status(200).send(docs);
        });
    } catch (err) {
        res.send(err);
    }
}

const filterTicket =async (req, res) => {
    const {status,from,to} = req.query;
    try {
        if (status && !from && !to) {
            Ticket.find({Status:status}, function (err, docs) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.status(200).send(docs);
                }
            })
        }
        else if (from && !status && !to) {
            let data = await Ticket.aggregate([
                {
                    $match: {
                        createdAt: {
                        $gte:new Date(from)
                    }
                }}
            ])
            if (data) res.status(200).send(data);
        }
        else if (from && !status && to) {
            let data = await Ticket.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(from),
                            $lte: new Date(to)
                        }
                    }
                }
            ])
            if (data) res.status(200).send(data);
        }
        else if (from && status && to) {
            let data = await Ticket.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(from),
                            $lte: new Date(to)
                        },
                            Status:status
                        
                    }
                }
            ])
            if (data) res.status(200).send(data);
        }
        else {
            res.status(200).send('Data not found');
        }

    } catch (err) {
        res.send(err);
    }
}

const updateTicket = (req, res) => {   
    const { Id, status } = req.body;
    try {
        Ticket.findById(Id, function (err, docs) {
            if (err) {
                res.send(err);
            }
            else {
                let date = docs.updated_at;
                date.push(new Date());
            Ticket.findByIdAndUpdate(Id, { Status: status,updated_at:date},
                function (err, docs) {
                    if (err) res.send(err);
                        else res.status(200).send("Ticket Got Updated");
                })
            }
        })
    } catch (err) {
        res.send(err);
    }
}


module.exports = {
    createTicket,
    getTickets,
    filterTicket,
    updateTicket
}