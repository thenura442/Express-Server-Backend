const config = require( '../Config/config')

module.exports = { createUpload , updateUpload};


/**
 * @description Create upload files url
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function createUpload ( req, res ) {
  try {
    console.log(req.files)
    let url = config.url+'/Files/';
    let arr = [];
    let img;
    let files = req.files;
    for( let i=0; i<files.length; i++ ) {
      if(files[i].mimetype == 'application/msword' || files[i].mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        img = url+'_word.png' ;
      }
      if(files[i].mimetype == 'application/vnd.ms-powerpoint' || files[i].mimetype == 'application/vnd.openxmlformats-officedocument.presentationml.presentation'){
        img = url+'_ppt.png' ;
      }
      if(files[i].mimetype == 'application/pdf'){
        img = url+'_pdf.jpeg' ;
      }
      if(files[i].mimetype == 'application/vnd.ms-excel' || files[i].mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
        img = url+'_excel.png' ;
      }
      if(files[i].mimetype == 'text/plain'){
        img = url+'_txt.jpeg' ;
      }
      if(files[i].mimetype == 'application/zip' || files[i].mimetype == 'application/x-7z-compressed' || files[i].mimetype == 'application/vnd.rar' || files[i].mimetype == 'application/gzip'){
        img = url+'_zip.jpeg' ;
      }
      arr.push({file: files[i], url: url+files[i].filename , img : img})
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
      let url = config.url+'/Files/'+req.file.filename;
      return res.send( {"result": url} );
    } catch ( err ) {
      console.log( err ); 
      res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
    }
  }