// services/PostService.js
const MongooseService = require( '../Utils/functions' ); // Data Access Layer
const FileModel = require( "../Models/subject.model" ); // Database Model
const { SubjectValidation } = require("../Validation/subject.validation");


class FileService {
  /**
   * @description Create an instance of PostService
   */
  constructor () {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService( FileModel );
  }

  
  /**
   * @description Attempt to create a post with the provided object
   * @param body {object} Object containing all required fields to
   * create post
   * @returns {Object}
   */
  async create ( body) {
    try {
      //Validate user with Joi Schema
      let error = await SubjectValidation(body)
      if (error) return {Status: 400 , Error: error.details[0].message }

      //Check if email already exists
      let emailExist = await this.findEmailExist(body);
      if(emailExist) return  {Status: 400 , Email : emailExist.email, Error: "Email already Exists" }
      
      //Creating the User
      this.MongooseServiceInstance = new MongooseService( model );
      return await this.MongooseServiceInstance.create( body )
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/register.service.js - create(body)"};
    }
  }
}

module.exports = FileService;