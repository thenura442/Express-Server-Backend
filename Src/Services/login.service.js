const bcrypt = require('bcryptjs');
const auth = require('../Middleware/auth');
const MongooseService = require( '../Utils/functions' ); // Data Access Layer
const FileModel = require( "../Models/user.model" ); // Database Model
const { loginValidation } = require("../Validation/user.validation");


class LoginService {

  constructor () {}

  
  /**
   * @description Attempt to login with the provided object
   * @param body {object} Object containing 'email' and 'passwords' fields to
   * get authenticated
   * @returns {Object}
   */
  async loginAndAuthenticate( body ) {
    try {
      //Validate user with Joi Schema
      let {error} = await loginValidation(body)
      if (error) return {Status: "400" , Error: error.details[0].message }

      //Check if email already exists
      let User = await this.findEmailExist(body);
      if(!User) return  {Status: "400" , Error: "Email or Password is Incorrect" }

      //Checking Password
      const validPassword = await bcrypt.compare(body.password, User.password)
      if(!validPassword) return {Status: "400" , Error: "Email or Password is Wrong Incorrect" }

      //User Authorization Token with Jwt Authentication
      let user = { _id: User._id, email: User.email, type: User.type };
      let token = auth.authenticateToken(user);
      return { Status: 200 , Token: token.accessToken , Refresh: token.refreshToken , "_id": User._id, "email": User.email , "type": User.type }
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/register.service.js - find(body)"};
    }
  }
  


  /**
   * @description Attempt to find posts with the provided object
   * @param body {object} Object containing 'type' and 'email;' fields to
   * find posts
   * @returns {Object}
   */
  async findEmailExist( body ) {
    try {
      let model = this.getType(body.type);
      this.MongooseServiceInstance = new MongooseService( model );
      return await this.MongooseServiceInstance.findOne({email : body.email});
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/register.service.js - findEmailExist(body)"};
    }
  }




  /**
   * @description Attempt to provide with the required Collection
   * @param type {string} string containing the user type
   * @returns collection to be used with Mongoose Instance
   */
  getType(type){
    let collection;
    if(type === 'staff' || type === 'temp-admin' || type === 'lecturer') {
      collection = FileModel.Staff
    }
    if(type === 'student'){
      collection = FileModel.Student
    }
    return collection
  }
}

module.exports = LoginService;