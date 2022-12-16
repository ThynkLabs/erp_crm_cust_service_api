const { app } = require('../index');
const request = require('supertest');

//create route
describe("Create", () => {
    let req = {
        phone: "2345678765432eres",
        issue: "this is demo issue"
    };

    describe("Create Ticket Route", () => {
        describe("Ticket Got Created", () => {
            it("should return a 200", async () => {
                const res = await request(app).post('/createTicket').send(req);
                expect(res.statusCode).toBe(200);
                expect(res.body.Issue).toBe(req.issue);
            })
        })
    })
})


//Get Tickets 
describe("GetAll", () => {
    describe("Get Tickets Route", () => {
        describe("Get all Tickets", () => {
            it("should return a 200", async () => {
                const res = await request(app).get('/getTicket');
                expect(res.statusCode).toBe(200);
                expect(res.body).not.toBeUndefined();
            })
        })
    })
})


//Update Route
describe("Update", () => {
    let req = {
        Id: "639c2f6dea7adb4ec8c84e8c",
        status: "Set"
    };

    describe("Update Ticket Route", () => {
        describe("Ticket Got Updated", () => {
            it("should return a 200", async () => {
                const res = await request(app).patch('/updateTicket').send(req);
                expect(res.statusCode).toBe(200);
            })
        })
    })
})


//filter Route
describe("Filter", () => {
    describe("Update Ticket Route", () => {
        describe("Ticket Got Updated", () => {
            it("should return a 200", async () => {
                const res = await request(app).get('/filter?from=2022-10-10&to=2022-12-18&status=Set');
                expect(res.statusCode).toBe(200);
            })
        })
    })
})