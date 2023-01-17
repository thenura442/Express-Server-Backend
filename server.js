const express = require('express');
const cors = require('cors');
let db = require('./Src/Models/model');
let config = require('./Src/Config/config');

const app = express();
let port = config.port
let route = require('./Src/Routes/route')
const corsOptions={
    origin:'http://localhost:5500',
    optionsSuccessStatus:200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', route)

app.use('/', (req, res) => {
    res.send({ 
        status: 200,
        message: 'Server Loaded Successfully',
        Description: config.name+' RestAPI For a MEAN Application Project',
        Port: config.port,
        BaseUrl: config.url+config.port     
    });
} )


app.listen(port, () => {
    console.log(`Sever Running on port ${port}`)
});  