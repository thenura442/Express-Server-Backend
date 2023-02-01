var request = require('supertest'), server = require('../../server');
var chai = require('chai');




describe("Integration Testing - Testing Routes as a Whole", function(){

    it("Testing Basic Get Route", function(done){
        request(server.app).get("/")
            .expect(200)
            .expect({"status":200,"message":"Server Loaded Successfully","Description":"DLE Backend Server RestAPI For a MEAN Application Project","Port":"5500","BaseUrl":"http://localhost:5500"},done);
    })

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
                "password":"ama",
                "type":"staff"
            })
        chai.assert.equal('"email" must be a valid email',result.body.Error,'Wrong Message Returned!')
    })

    it("Testing If Jwt Authentication Works by Calling unauthorized Route", async function(){
        let result = await request(server.app).post("/api/user/get/id")
            .send({
                "email": "am1a@gmail.com",
                "password":"ama123",
                "type":"staff"
            })
        chai.assert.equal(406,result.status,'Wrong Message Returned!')
    })

    it("Testing If Required User is found", async function(){
        let result = await request(server.app).post("/api/user/get/id")
            .set('Cookie', 'cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyMzEwMDAiLCJlbWFpbCI6ImFtMWFAZ21haWwuY29tIiwidHlwZSI6InN0YWZmIiwiaWF0IjoxNjc1MjE5NDQ0fQ.H8gH_cHtm-JHMNEd4OwBl3mcmV2WsEVbW9Wd0c9m4_o')
            .send({
                "email": "am1a@gmail.com",
                "type":"staff"
            })
        chai.assert.equal(200,result.status,'Wrong Message Returned!')
    })
    
})