const file = require( "../Services/register.service" );
const FileService = new file();

module.exports = { createUser , getAllUsers ,findOne , updateOne, updateMany , deleteOne , deleteMany };

/**
 * @description Create a cord with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */
async function createUser ( req, res ) {
  try {
    const createdCord = await FileService.create( req.body);
    return res.send( createdCord );
  } catch ( err ) {
    res.status( 500 ).send( { Status: 500 ,Error : `${err.name} : ${err.message}` } );
  }
}

async function getAllUsers ( req, res ) {
  try {
    const createdCord = await FileService.find( req.body);
    return res.send( createdCord );
  } catch ( err ) {
    res.status( 500 ).send( { Status: 500 ,Error : `${err.name} : ${err.message}` } );
  }
}

async function findOne ( req, res ) {
  try {
    const createdCord = await FileService.findOne( req.body);
    return res.send( createdCord );
  } catch ( err ) {
    res.status( 500 ).send( { Status: 500 ,Error : `${err.name} : ${err.message}` } );
  }
}

async function updateOne ( req, res ) {
  try {
    const createdCord = await FileService.updateOne( req.body);
    
    return res.send( createdCord );
  } catch ( err ) {
    res.status( 500 ).send( { Status: 500 ,Error : `${err.name} : ${err.message}` } );
  }
}


async function updateMany ( req, res ) {
  try {
    console.log( "Hi");
    const createdCord = await FileService.updateMany( req.body);
    
    return res.send( createdCord );
  } catch ( err ) {
    res.status( 500 ).send( { Status: 500 ,Error : `${err.name} : ${err.message}` } );
  }
}


async function deleteOne ( req, res ) {
  try {
    console.log( "Hi");
    const createdCord = await FileService.deleteOne( req.body);
    
    return res.send( createdCord );
  } catch ( err ) {
    res.status( 500 ).send( { Status: 500 ,Error : `${err.name} : ${err.message}` } );
  }
}


async function deleteMany ( req, res ) {
  try {
    console.log( "Hi");
    const createdCord = await FileService.deleteMany( req.body);
    
    return res.send( createdCord );
  } catch ( err ) {
    res.status( 500 ).send( { Status: 500 ,Error : `${err.name} : ${err.message}` } );
  }
}