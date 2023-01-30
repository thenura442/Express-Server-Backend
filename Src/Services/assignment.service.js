// services/PostService.js
const MongooseService = require( '../Utils/functions' ); // Data Access Layer
const FileModel = require( "../Models/assignment.model" ); // Database Model


class FileService {
  /**
   * @description Create an instance of PostService
   */
  constructor () {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService( FileModel.Assignment );
  }

  
  /**
   * @description Attempt to create a Assignment with the provided object
   * @param body {object} Object containing all required fields to
   * create post
   * @returns {Object}
   */
  async create ( body) {
    try {
      return await this.MongooseServiceInstance.create( body )
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/assignment.service.js - create(body)"};
    }
  }



  /**
   * @description Attempt to find a Assignment with the provided object
   * @param body {object} Object containing '_id' field to
   * find specific post
   * @returns {Object}
   */
  async findAssignment( body ) {
    try {
      return await this.MongooseServiceInstance.findOne( {id: body.id, subject: body.subject} );
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/assignment.service.js - findAssignment(body)"};
    }
  }


  /**
   * @description Attempt to find and update with the provided object
   * @param body {object} Object containing '_id' field to
   * update specific post
   * @returns {Object}
   */
  async updateAssignment( body ) {
    try {
      return await this.MongooseServiceInstance.updateOne( {id: body.id, subject: body.subject},body);
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/assignment.service.js - updateAssignment(body)"};
    }
  }



  /**
   * @description Attempt to delete Assignment with the provided id
   * @param body {object} Object containing '_id' field to
   * find specific post
   * @returns {Object}
   */
  async deleteAssignment( body ) {
    try {
      return await this.MongooseServiceInstance.deleteOne({id: body.id});
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/assignment.service.js - deleteAssignment(body)"};
    }
  }



  /**
   * @description Attempt to get all Assignments with the provided grade
   * @param body {object} Object containing 'grade' field to
   * find specific post
   * @returns {Object}
   */
  async getAssignments( body ) {
    try {
      return await this.MongooseServiceInstance.find({subject: body.subject, grade: body.grade});
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/assignment.service.js - getAssignments(body)"};
    }
  }
}


module.exports = FileService;