class MongooseService {
    /**
     * @description Create an instance of the MongooseService class
     * @param Model {mongoose.model} Mongoose Model to use for the instance
     */
    constructor ( Model ) {
      this.model = Model;
    }
  
    /**
     * @description Create a new document on the Model
     * @param pipeline {array} Aggregate pipeline to execute
     * @returns {Promise} Returns the results of the query
     */
    aggregate ( pipeline ) {
      return this.model.aggregate( pipeline ).exec();
    }
  
    /**
     * @description Create a new document on the Model
     * @param body {object} Body object to create the new document with
     * @returns {Promise} Returns the results of the query
     */
    async create ( body ) {
      try{
        let result = await this.model.create(body);
        return result 
      }
      catch(err){
        console.log(err)
        return { Status: 500, Location: "./Src/Utils/functions.js - create(body)" ,Error: `${err.name} : ${err.message} ` }
      }
    }
  
    /**
     * @description Count the number of documents matching the query criteria
     * @param query {object} Query to be performed on the Model
     * @returns {Promise} Returns the results of the query
     */
    count ( query ) {
      return this.model.count( query ).exec();
    }
  
    /**
     * @description Delete an existing document on the Model
     * @param id {string} ID for the object to delete
     * @returns {Promise} Returns the results of the query
     */
    async deleteOne( id ) {
      try{
        let result = await this.model.deleteOne( id ).select({ __v: 0 });
        console.log( result );
        return result 
      }
      catch(err){
        console.log(err)
        return { Status: 500, Location: "./Src/Utils/functions.js - deleteOne(id)" ,Error: `${err.name} : ${err.message} ` }
      }
    }



    /**
     * @description Delete an existing document on the Model
     * @param id {string} ID for the object to delete
     * @returns {Promise} Returns the results of the query
     */
    async deleteMany( query ) {
      try{
        let result = await this.model.deleteMany( query ).select({ __v: 0 });
        console.log( result );
        return result 
      }
      catch(err){
        console.log(err)
        return { Status: 500, Location: "./Src/Utils/functions.js - deleteMany(id)" ,Error: `${err.name} : ${err.message} ` }
      }
    }



  
    /**
     * @description Retrieve distinct "fields" which are in the provided status
     * @param query {object} Object that maps to the status to retrieve docs for
     * @param field {string} The distinct field to retrieve
     * @returns {Promise} Returns the results of the query
     */
    findDistinct ( query, field ) {
      return this.model
        .find( query )
        .distinct( field )
        .exec();
    }
  
    /**
     * @description Retrieve a single document from the Model with the provided
     *   query
     * @param query {object} Query to be performed on the Model
     * @param {object} [projection] Optional: Fields to return or not return from
     * query
     * @param {object} [options] Optional options to provide query
     * @returns {Promise} Returns the results of the query
     */
    async findOne ( query, projection = { __v: 0 } ) {
        // .select( { __v: 0 } )
      
        try{
          let result = await this.model.findOne( query, projection ).select({ __v: 0 });
          return result 
        }
        catch(err){
          console.log(err)
          return { Status: 500, Location: "./Src/Utils/functions.js - findOne(query, projection)" ,Error: `${err.name} : ${err.message} ` }
        }
        
        
    }
  
    /**
     * @description Retrieve multiple documents from the Model with the provided
     *   query
     * @param query {object} - Query to be performed on the Model
     * @param {object} [projection] Optional: Fields to return or not return from
     * query
     * @param {object} [sort] - Optional argument to sort data
     * @param {object} [options] Optional options to provide query
     * @returns {Promise} Returns the results of the query
     */
    async find ( query, projection = { __v: 0 }) {
      try{
        let result = await this.model.find( query , projection ).exec();
        return result 
      }
      catch(err){
        console.log(err)
        return { Status: 500, Location: "./Src/Utils/functions.js - find(query, projection)" ,Error: `${err.name} : ${err.message} ` }
      }
    }


  
    // /**
    //  * @description Retrieve a single document matching the provided ID, from the
    //  *   Model
    //  * @param id {string} Required: ID for the object to retrieve
    //  * @param {object} [projection] Optional: Fields to return or not return from
    //  * query
    //  * @param {object} [options] Optional: options to provide query
    //  * @returns {Promise} Returns the results of the query
    //  */
    // async findById ( id, projection = { __v: 0 }) {
    //   try{
    //     let result = await this.model.findById( id, projection )
    //     return result 
    //   }
    //   catch(err){
    //     console.log(err)
    //     return { Status: 500, Location: "./Src/Utils/functions.js - fundById(query, projection)" ,Error: `${err.name} : ${err.message} ` }
    //   }
    // }




  
    /**
     * @description Update a document matching the provided ID, with the body
     * @param id {string} ID for the document to update
     * @param body {object} Body to update the document with
     * @param {object} [options] Optional options to provide query
     * @returns {Promise} Returns the results of the query
     */
    async update ( id, body, options = { lean: true, new: true } ) {
        try{
          let result = await this.model.findByIdAndUpdate( id, body, options )
          return result 
        }
        catch(err){
          console.log(err)
          return { Status: 500, Location: "./Src/Utils/functions.js - find(id, body, options)" ,Error: `${err.name} : ${err.message} ` }
        }
    }





    /**
     * @description Update a document matching the provided ID, with the body
     * @param id {string} ID for the document to update
     * @param body {object} Body to update the document with
     * @param {object} [options] Optional options to provide query
     * @returns {Promise} Returns the results of the query
     */
    async updateMany ( condition, update, options = { lean: true, new: true } ) {
      try{
        let result = await this.model.updateMany( condition, update, options )
        return result 
      }
      catch(err){
        console.log(err)
        return { Status: 500, Location: "./Src/Utils/functions.js - updateMany(condition, update, options)" ,Error: `${err.name} : ${err.message} ` }
      }
    }


    ErrorReturn( result){
      if(!result.Error) return { Success: true, Body: result };
      else return { Success: false, Error: result }
    }


  }
  
  module.exports = MongooseService;