const file = require( "../Services/assignment.service" );
const FileService = new file();
const config = require( '../Config/config')

module.exports = { createUpload , updateUpload, deleteUpload};


/**
 * @description Create upload files url
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function createUpload ( req, res ) {
  try {
    console.log(req.files)
    let url = config.url+''+config.port+'/Files/';
    let arr = {};
    let files = req.files;
    for( let i=0; i<files.length; i++){
        arr[i] = url+files[i].filename
    }
    console.log(arr);
    return res.send(arr);
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}


/**
 * @description Create upload files url
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function updateUpload ( req, res ) {
    try {
      let url = config.url+''+config.port+'/Files/'+req.file.filename;
      return res.send( {"result": url} );
    } catch ( err ) {
      console.log( err ); 
      res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
    }
  }


  /**
 * @description Create upload files url
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function deleteUpload ( req, res ) {
    try {
      let url = config.url+''+config.port+'/Files/'+req.file.filename;
      return res.send( {"result": url} );
    } catch ( err ) {
      console.log( err ); 
      res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
    }
  }