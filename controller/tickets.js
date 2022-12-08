const Ticket = require('../DB/ticketSchema');
const createTicket = async (req, res) => {
    const {phone,issue} = req.body;
    try {
        var ticket =await Ticket.create({Phone:phone,Issue:issue});
        ticket.save(function (err, result) {
            if (err) return res.send(err);
            res.send(result);
        });
    } catch (err) {
        console.log(err);
    }
}

const getTickets = (req, res) => {
    try {
        Ticket.find({}, function (err, docs) {
            if (err) res.send(err);
            res.send(docs);
        });
    } catch (err) {
        console.log(err);
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
                    res.send(docs);
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
            if (data) res.send(data);
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
            if (data) res.send(data);
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
            if (data) res.send(data);
        }
        else {
            res.send('Data not found');
        }

    } catch (err) {
        console.log(err);
    }
}

const updateTicket = (req, res) => {   
    const { Id, status } = req.body;
    try {
        Ticket.findByIdAndUpdate(Id, { Status: status },
        function (err, docs) {
            if (err) res.send(err);
            else res.send("Ticket Got Updated");
        })
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    createTicket,
    getTickets,
    filterTicket,
    updateTicket
}