const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const socket = require('socket.io');

const app = express();
//Requiring the model.js that will connect to the DB with constructor
require('./Src/Models/model');

//Defining required configuration and variables
let config = require('./Src/Config/config');
let route = require('./Src/Routing/route')
let port = config.port

//Cors(cross orgin request) options are set here
const corsOptions={
    credentials: true, 
    origin:['https://cms-dle.netlify.app','http://localhost:4200'],
    //credentials:true,            //access-control-allow-credentials:true
    optionsSuccessStatus:200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

app.use(express.static(path.join(__dirname, 'Public')));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
const rooms = { name: { user:{}}};

app.post('/room', (req, res) => {
    rooms[req.body.room] = { users: {} }
    // Send message that new room was created
    io.emit('room-created', req.body.room)
  })

  app.get('/get', (req, res) => {
    res.send({rooms:rooms})
  })
app.use('/api', route)

//Default Loading for the Server
app.use('/', (req, res) => {
    res.send({ 
        status: 200,
        message: 'Server Loaded Successfully',
        Description: config.name+' RestAPI For a MEAN Application Project',
        Port: config.port,
        BaseUrl: config.url   
    });
})

module.exports.app = app;

var server = require('http').Server(app);

server.listen(port, function(){
    console.log('listening on port 5500');
})

var io = socket(server, {cors: {origin: "*"}});

io.on('connection', (socket) => {
    console.log(`New Connection ${socket.id}`);

    socket.on('new-user', ((room,name)=>{
        console.log('New User')
        socket.join(room);
        rooms[room].users[socket.id] = name;
        socket.to(room).emit('user-connected',name);
    }))

    socket.on('chat', function(room, data){
        socket.to(room).emit('chat',data);
    })
    socket.on('typing',function(room, data){
        socket.to(room).emit('typing',data);
    })

    socket.on('delete-chat',function(room){
        console.log(delete rooms[room]);
    })
})