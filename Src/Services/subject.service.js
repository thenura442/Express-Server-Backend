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
    this.MongooseServiceInstance = new MongooseService( FileModel.Subject );
  }

  
  /**
   * @description Attempt to create a post with the provided object
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
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/subject.service.js - create(body)"};
    }
  }



  /**
   * @description Attempt to find a post with the provided object
   * @param body {object} Object containing '_id' field to
   * find specific post
   * @returns {Object}
   */
  async findSubject( body ) {
    try {
      return await this.MongooseServiceInstance.findById( body._id);
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/subject.service.js - findSubject(body)"};
    }
  }


  /**
   * @description Attempt to find a update with the provided object
   * @param body {object} Object containing '_id' field to
   * update specific post
   * @returns {Object}
   */
  async updateSubject( body ) {
    try {
      return await this.MongooseServiceInstance.update( body._id,body);
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/subject.service.js - updateSubject(body)"};
    }
  }



  /**
   * @description Attempt to delete subject with the provided id
   * @param body {object} Object containing '_id' field to
   * find specific post
   * @returns {Object}
   */
  async deleteSubject( body ) {
    try {
      return await this.MongooseServiceInstance.deleteOne({_id: body._id});
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/subject.service.js - deleteSubject(body)"};
    }
  }



  /**
   * @description Attempt to get all subject with the provided grade
   * @param body {object} Object containing 'grade' field to
   * find specific post
   * @returns {Object}
   */
  async getStudentSubjects( body ) {
    try {
      return await this.MongooseServiceInstance.find({grade: body.grade},  { _id: 1});
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/subject.service.js - getStudentSubjects(body)"};
    }
  }


  /**
   * @description Attempt to get all Assignments with the provided grade
   * @param body {object} Object containing 'lecturer_id' field to
   * find subjects
   * @returns {Object}
   */
  async getLecturerSubjects( body ) {
    try {
      return await this.MongooseServiceInstance.find({lecturer_id: body.lecturer_id});
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/subject.service.js - getLecturerSubjects(body)"};
    }
  }
}


module.exports = FileService;