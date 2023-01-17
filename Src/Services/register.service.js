// services/PostService.js

const MongooseService = require( '../Utils/functions' ); // Data Access Layer
const FileModel = require( "../Models/register.model" ); // Database Model
const { response } = require('express');


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
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   */
  async create ( body) {
    try {
        let model = this.getType(body.type);
        this.MongooseServiceInstance = new MongooseService( model );
        const result = await this.MongooseServiceInstance.create( body );
        return this.MongooseServiceInstance.ErrorReturn(result)
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500, Location: "./Src/Service/register.service.js - create(body)" , Error : `${err.name} : ${err.message} `};
    }
  }




  /**
   * @description Attempt to create a post with the provided object
   * @param body {object} Object containing all required fields to
   * create post
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   */
  async find( body ) {
    try {
      let model = this.getType(body.type);        
      this.MongooseServiceInstance = new MongooseService( model );
      const result = await this.MongooseServiceInstance.find();
      return this.MongooseServiceInstance.ErrorReturn(result)
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500, Location: "./Src/Service/register.service.js - find(body)" , Error : `${err.name} : ${err.message} `};
    }
  }





  /**
   * @description Attempt to create a post with the provided object
   * @param body {object} Object containing all required fields to
   * create post
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   */
  async findOne( body ) {
    try {
      let model = this.getType(body.type);        
      this.MongooseServiceInstance = new MongooseService( model );
      const result = await this.MongooseServiceInstance.findOne(body.email);
      return this.MongooseServiceInstance.ErrorReturn(result)
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500, Location: "./Src/Service/register.service.js - findOne(body)" , Error : `${err.name} : ${err.message} `};
    }
  }

  async updateOne( body ) {
    try {
      let model = this.getType(body.type);        
      this.MongooseServiceInstance = new MongooseService( model );
      const result = await this.MongooseServiceInstance.update(body._id,body);
      return this.MongooseServiceInstance.ErrorReturn(result)
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500, Location: "./Src/Service/register.service.js - updateOne(body)" , Error : `${err.name} : ${err.message} `};
    }
  }



  async updateMany( body ) {
    try {
      let model = this.getType(body.type);        
      this.MongooseServiceInstance = new MongooseService( model );
      const result = await this.MongooseServiceInstance.updateMany({name: body.name},{email: body.email});
      return this.MongooseServiceInstance.ErrorReturn(result)
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500, Location: "./Src/Service/register.service.js - updateMany(body)" , Error : `${err.name} : ${err.message} `};
    }
  }


  async deleteOne( body ) {
    try {
      let model = this.getType(body.type);
      console.log( body._id);        
      this.MongooseServiceInstance = new MongooseService( model );
      const result = await this.MongooseServiceInstance.deleteOne({_id: body._id});
      return this.MongooseServiceInstance.ErrorReturn(result)
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500, Location: "./Src/Service/register.service.js - deleteOne(body)" , Error : `${err.name} : ${err.message} `};
    }
  }


  async deleteMany( body ) {
    try {
      let model = this.getType(body.type);
      console.log( body._id);        
      this.MongooseServiceInstance = new MongooseService( model );
      const result = await this.MongooseServiceInstance.deleteMany({email: body.email});
      return this.MongooseServiceInstance.ErrorReturn(result)
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500, Location: "./Src/Service/register.service.js - deleteMany(body)" , Error : `${err.name} : ${err.message} `};
    }
  }




  getType(type){
    console.log(type)
    let collection;
    if(type === 'temp-admin') {
      collection = FileModel.Admin
    }
    else if (type === 'staff'){
      collection = FileModel.Staff
    }
    else if (type === 'lecturer'){
      collection = FileModel.Lecturer
    }
    else{
      collection = FileModel.Student
    }
    return collection
  }
}

module.exports = FileService;