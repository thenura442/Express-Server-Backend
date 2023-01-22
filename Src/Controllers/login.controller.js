const login = require( "../Services/login.service" );
const LoginService = new login();

module.exports = { loginUser};

/**
 * @description Find email and authenticate with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function loginUser ( req, res ) {
  try {
    const result = await LoginService.loginAndAuthenticate( req.body);
    if(!result.Token) {return res.send(result)}
    res.cookie('jwt', result.Token, {httpOnly: true,maxAge: 24*60*60*1000})
    return res.send(result)    
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}
  