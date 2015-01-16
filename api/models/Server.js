/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


module.exports = {

  schema: true,
  attributes: {
      
      id: {
          primaryKey: true,
          type: 'integer',
          autoIncrement: true
      },
      
      name: {
          type: 'string',
          required: true,
      },
      
      game:{
            model: 'game',
            type: 'json',
            required: true
      },
      
      deleted: {
          type: 'boolean',
          defaultsTo: false
      },
      
      finished: {
          type: 'boolean',
          defaultsTo: false
      },
      
      participants: {
          
          collection: 'player',
          type: 'array'
      },
      
      participantsMax: {
          type: 'integer',
          required: true,
          defaultsTo: 10
      }
  }
};