const login = require( "../Services/login.service" );
const LoginService = new login();

module.exports = { loginUser, logoutUser};

/**
 * @description Find email and authenticate with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function loginUser ( req, res ) {
  try {
    const result = await LoginService.loginAndAuthenticate( req.body);
    if(!result.Token) {
      return res.send(result)
    }
    console.log(result.Token)
    res.cookie('Cookie', result.Token, {maxAge: 62*60*1000, httpOnly: true, sameSite: 'none', secure: true}) 
    res.send({ Status: 200 , _id: result._id, email: result.email , type: result.type, grade: result.grade, dle_access: result.dle_access})    
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}



/**
 * @description Find email and authenticate with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function logoutUser ( req, res ) {
  try {
    res.cookie('Cookie', "cookie=loggedout", {maxAge: -1, httpOnly: true, sameSite: 'none', secure: true}) 
    return res.send({logout: 'success'});  
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}
  