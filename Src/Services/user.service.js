// services/PostService.js
const bcrypt = require('bcryptjs');
const auth = require('../Middleware/auth');
const MongooseService = require( '../Utils/functions' ); // Data Access Layer
const FileModel = require( "../Models/user.model" ); // Database Model
const { registerStudentValidation , registerStaffValidation , loginValidation } = require("../Validation/user.validation");


class FileService {
  /**
   * @description Create an instance of PostService
   */
  constructor () {
    // Create instance of Data Access layer using our desired model
    // this.MongooseServiceInstance = new MongooseService( FileModel );
  }

  
  /**
   * @description Attempt to create a post with the provided object
   * @param body {object} Object containing all required fields to
   * create post
   * @returns {Object}
   */
  async create ( body) {
    try {

      //Getting _id for the posting object
      let id = await this.getNewId();
      if(!id._id) return {Status: 500 ,Error: id.Error}
      body._id = id._id;


      //Validate user with Joi Schema
      let error = await this.validateRegistration(body)
      if (error) return {Status: "400" , Error: error.details[0].message }

      //Check if email already exists
      let emailExist = await this.findEmailExist(body);
      if(emailExist) return  {Status: "400" , Email : emailExist.email, Error: "Email already Exists" }

      //Hashing the Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.password, salt)
      body.password = hashedPassword;
      
      //Creating the User
      let model = this.getType(body.type);
      this.MongooseServiceInstance = new MongooseService( model );
      return await this.MongooseServiceInstance.create( body )
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/register.service.js - create(body)"};
    }
  }



 





  // /**
  //  * @description Attempt to login with the provided object
  //  * @param body {object} Object containing 'email' and 'passwords' fields to
  //  * get authenticated
  //  * @returns {Object}
  //  */
  // async loginAndAuthenticate( body ) {
  //   try {
  //     //Validate user with Joi Schema
  //     let {error} = await loginValidation(body)
  //     if (error) return {Status: "400" , Error: error.details[0].message }

  //     //Check if email already exists
  //     let User = await this.findEmailExist(body);
  //     if(!User) return  {Status: "400" , Error: "Email or Password is Wrong" }

  //     //Checking Password
  //     const validPassword = await bcrypt.compare(body.password, User.password)
  //     console.log(validPassword)
  //     if(!validPassword) return {Status: "400" , Error: "Email or Password is Wrong" }

  //     //User Authorization Token with Jwt Authentication
  //     let user = { _id: User._id, email: User.email, type: User.type };
  //     let token = auth.authenticateToken(user);
  //     return { Status: 200 , Header: "Authorization", Token: "Bearer " + token.accessToken , Refresh: "Bearer " + token.refreshToken}
  //   } 
  //   catch ( err ) {
  //     console.log( err)
  //     return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/register.service.js - find(body)"};
  //   }
  // }

  

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
   * @description Attempt to find posts with the provided object
   * @param body {object} Object containing 'type' field to
   * find posts
   * @returns {Object}
   */
  async find( body ) {
    try {
      let model = this.getType(body.type);
      this.MongooseServiceInstance = new MongooseService( model );
      return await this.MongooseServiceInstance.find();
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/register.service.js - find(body)"};
    }
  }



  /**
   * @description Attempt to find a post with the provided object
   * @param body {object} Object containing '_id' field to
   * find specific post
   * @returns {Object}
   */
  async findOne( body ) {
    try {
      let model = this.getType(body.type);        
      this.MongooseServiceInstance = new MongooseService( model );
      return await this.MongooseServiceInstance.findById( body._id);
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/register.service.js - findOne(body)"};
    }
  }



  /**
   * @description Attempt to update a post with the provided object
   * @param body {object} Object containing '_id' field and the updated body
   * to update specific post
   * @returns {Object}
   */
  async updateOne( body ) {
    try {
      let model = this.getType(body.type);        
      this.MongooseServiceInstance = new MongooseService( model );
      return await this.MongooseServiceInstance.update(body._id,body);
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500, Error : `${err.name} : ${err.message} `, Location: "./Src/Service/register.service.js - updateOne(body)" };
    }
  }


  /**
   * @description Attempt to update posts with the provided object
   * @param body {object} Object containing query parameter and to be updated 
   * content to update posts that match the query
   * @returns {Object}
   */
  async updateMany( body ) {
    try {
      let model = this.getType(body.type);        
      this.MongooseServiceInstance = new MongooseService( model );
      return await this.MongooseServiceInstance.updateMany({name: body.name},{email: body.email});
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/register.service.js - updateMany(body)"};
    }
  }


  /**
   * @description Attempt to delete a post with the provided object
   * @param body {object} Object containing '_id' field to delete specific post
   * @returns {Object}
   */
  async deleteOne( body ) {
    try {
      let model = this.getType(body.type);     
      this.MongooseServiceInstance = new MongooseService( model );
      return await this.MongooseServiceInstance.deleteOne({_id: body._id});
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/register.service.js - deleteOne(body)"};
    }
  }


  /**
   * @description Attempt to delete posts with the provided object
   * @param body {object} Object containing query parameter and to be updated 
   * content to update posts that match the query
   * @returns {Object}
   */
  async deleteMany( body ) {
    try {
      let model = this.getType(body.type);  
      this.MongooseServiceInstance = new MongooseService( model );
      return await this.MongooseServiceInstance.deleteMany({email: body.email});
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500, Error : `${err.name} : ${err.message} `, Location: "./Src/Service/register.service.js - deleteMany(body)" };
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

  validateRegistration(body){
    if(body.type === 'staff' || body.type === 'temp-admin' || body.type === 'lecturer') {
      let { error } = registerStaffValidation(body);
      return error
    }
    if(body.type === 'student'){
      let { error } = registerStudentValidation(body);
      return error
    }
  }
}

module.exports = FileService;