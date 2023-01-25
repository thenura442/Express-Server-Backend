const file = require( "../Services/assignment.service" );
const FileService = new file();

module.exports = { createAssignment , findAssignment, updateAssignment, deleteAssignment, getAssignments};

/**
 * @description Create an assignment with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function createAssignment ( req, res ) {
  try {
    console.log('Urls'+req.body);
    const result = await FileService.create( req.body);
    return res.send( result );
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}

/**
 * @description Find an assignment with the provided id
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function findAssignment ( req, res ) {
  try {
    const result = await FileService.findAssignment( req.body);
    return res.send( result );
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}


/**
 * @description Find an assignment with the provided id and update it
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function updateAssignment ( req, res ) {
  try {
    const result = await FileService.updateAssignment( req.body);
    return res.send( result );
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}



/**
 * @description Delete an assignment with the provided id and delete it
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function deleteAssignment ( req, res ) {
  try {
    const result = await FileService.deleteAssignment( req.body);
    return res.send( result );
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}




/**
 * @description get assignments with the grade and subject provided
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function getAssignments ( req, res ) {
  try {
    const result = await FileService.getAssignments( req.body);
    return res.send( result );
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}

