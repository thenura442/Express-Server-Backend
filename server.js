const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const app = express();

//Requiring the model.js that will connect to the DB with constructor
require('./Src/Models/model');

//Defining required configuration and variables
let config = require('./Src/Config/config');
let route = require('./Src/Routing/route')
let port = config.port

//Cors(cross orgin request) options are set here
const corsOptions={
    origin:'http://localhost:5500',
    //credentials:true,            //access-control-allow-credentials:true
    optionsSuccessStatus:200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

app.use(express.static(path.join(__dirname, 'Public')));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.use('/api', route)

//Default Loading for the Server
app.use('/', (req, res) => {
    res.send({ 
        status: 200,
        message: 'Server Loaded Successfully',
        Description: config.name+' RestAPI For a MEAN Application Project',
        Port: config.port,
        BaseUrl: config.url+config.port     
    });
})

//Starting the Server
app.listen(port, () => {
    console.log(`Sever Running on port ${port}`)
});  