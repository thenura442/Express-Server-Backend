var request = require('supertest'), server = require('../../server');
var chai = require('chai');


// TESTING BASIC GET ROUTE

describe("Integration Testing - Testing Basic Get Route For Health Checks", function(){

    it("Testing Basic Get Route", function(done){
        request(server.app).get("/")
            .expect(200)
            .expect({"status":200,"message":"Server Loaded Successfully","Description":"DLE Backend Server RestAPI For a MEAN Application Project","Port":"5500","BaseUrl":"http://localhost:5500"},done);
    })
    
})



// TESTING USER ROUTES

describe("Integration Testing - Testing User Routes", function(){

    it("Testing Post User Login Route With Status Returned from Database", async function(){
        let result = await request(server.app).post("/api/auth/login")
            .send({
                "email": "am1a@gmail.com",
                "password":"ama123",
                "type":"staff"
            })
        chai.assert.equal(200,result.status,'Wrong Message Returned!')
    })

    it("Testing Post User Login Route With Invalid User Credentials", async function(){
        let result = await request(server.app).post("/api/auth/login")
            .send({
                "email": "am1a@gmail.com",
                "password":"ama",
                "type":"staff"
            })
        chai.assert.equal(400,result.body.Status,'Wrong Message Returned!')
    })

    it("Testing Post User Login Route With Invalid email format", async function(){
        let result = await request(server.app).post("/api/auth/login")
            .send({
                "email": "s",
                "password":"ama123",
                "type":"staff"
            })
        chai.assert.equal('"email" must be a valid email',result.body.Error,'Wrong Message Returned!')
    })    
})



// TESTING JWT Authenticated ROUTES

describe("Integration Testing - Testing If JWT Works Correctly", function(){

    it("Testing If Jwt Authentication Works by Calling unauthorized Route", async function(){
        let result = await request(server.app).post("/api/user/get/id")
            .send({
                "email": "am1a@gmail.com",
                "password":"ama123",
                "type":"staff"
            })
        chai.assert.equal(406,result.status,'Wrong Message Returned!')
    })    
})



// TESTING User Route

describe("Integration Testing - Testing If User Works Correctly", function(){

    it("Testing If User is rejected with Wrong Type", async function(){
        let result = await request(server.app).post("/api/user/get/id")
            .set('Cookie', 'cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyMzEwMDAiLCJlbWFpbCI6ImFtMWFAZ21haWwuY29tIiwidHlwZSI6InN0YWZmIiwiaWF0IjoxNjc1MjE5NDQ0fQ.H8gH_cHtm-JHMNEd4OwBl3mcmV2WsEVbW9Wd0c9m4_o')
            .send({
                "email": "am1a@gmail.com",
                "type":"none"
            })
        chai.assert.equal(500,result.status,'Wrong Message Returned!')
    })
    
})



// TESTING Subject Route

describe("Integration Testing - Testing If Subject Route Works Correctly", function(){

    it("Testing If Subject Returns Subject with ID", async function(){
        let result = await request(server.app).post("/api/subject/get/id")
            .set('Cookie', 'cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyMzEwMDAiLCJlbWFpbCI6ImFtMWFAZ21haWwuY29tIiwidHlwZSI6InN0YWZmIiwiaWF0IjoxNjc1MjE5NDQ0fQ.H8gH_cHtm-JHMNEd4OwBl3mcmV2WsEVbW9Wd0c9m4_o')
            .send({
                "_id": "S001"
            })
        chai.assert.equal(200,result.status,'Wrong Message Returned!')
    })


    it("Testing If Subject Returns Subject Details", async function(){
        let result = await request(server.app).post("/api/subject/get/id")
            .set('Cookie', 'cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyMzEwMDAiLCJlbWFpbCI6ImFtMWFAZ21haWwuY29tIiwidHlwZSI6InN0YWZmIiwiaWF0IjoxNjc1MjE5NDQ0fQ.H8gH_cHtm-JHMNEd4OwBl3mcmV2WsEVbW9Wd0c9m4_o')
            .send({
                "_id": "S001"
            })
        chai.assert.equal('Economics',result.body.name,'Wrong Message Returned!')
    })

    it("Testing If Find Subject Returns Status 400 on Wrong ID", async function(){
        let result = await request(server.app).post("/api/subject/get/id")
            .set('Cookie', 'cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyMzEwMDAiLCJlbWFpbCI6ImFtMWFAZ21haWwuY29tIiwidHlwZSI6InN0YWZmIiwiaWF0IjoxNjc1MjE5NDQ0fQ.H8gH_cHtm-JHMNEd4OwBl3mcmV2WsEVbW9Wd0c9m4_o')
            .send({
                "_id": "S01"
            })
        console.log(result)
        chai.assert.equal(400,result.body.status,'Wrong Message Returned!')
    })
    
})



// TESTING Assignment Routes

describe("Integration Testing - Testing If Assignment Route Works Correctly", function(){

    it("Testing If Assignment Returns Assignment with ID", async function(){
        let result = await request(server.app).post("/api/assignment/get/id")
            .set('Cookie', 'cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyMzEwMDAiLCJlbWFpbCI6ImFtMWFAZ21haWwuY29tIiwidHlwZSI6InN0YWZmIiwiaWF0IjoxNjc1MjE5NDQ0fQ.H8gH_cHtm-JHMNEd4OwBl3mcmV2WsEVbW9Wd0c9m4_o')
            .send({
                "id": "S002-A01",
                "subject": "S002"
            })
        chai.assert.equal(200,result.status,'Wrong Message Returned!')
    })

    it("Testing If Assignment Has at least One Attachment", async function(){
        let result = await request(server.app).post("/api/assignment/get/id")
            .set('Cookie', 'cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyMzEwMDAiLCJlbWFpbCI6ImFtMWFAZ21haWwuY29tIiwidHlwZSI6InN0YWZmIiwiaWF0IjoxNjc1MjE5NDQ0fQ.H8gH_cHtm-JHMNEd4OwBl3mcmV2WsEVbW9Wd0c9m4_o')
            .send({
                "id": "S002-A01",
                "subject": "S002"
            })
        chai.assert.equal(true,result.body.url.length > 0,'Wrong Message Returned!')
    })

    it("Testing If Find Assignment Returns Status 400 on Wrong ID", async function(){
        let result = await request(server.app).post("/api/subject/get/id")
            .set('Cookie', 'cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyMzEwMDAiLCJlbWFpbCI6ImFtMWFAZ21haWwuY29tIiwidHlwZSI6InN0YWZmIiwiaWF0IjoxNjc1MjE5NDQ0fQ.H8gH_cHtm-JHMNEd4OwBl3mcmV2WsEVbW9Wd0c9m4_o')
            .send({
                "_id": "S01"
            })
        console.log(result)
        chai.assert.equal(400,result.body.status,'Wrong Message Returned!')
    })
    
})