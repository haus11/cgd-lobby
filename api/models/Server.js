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
      
      roomName: {
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
      
      started: {
          type: 'boolean',
          defaultsTo: false
      },
      
      player: {
          
          collection: 'player',
          type: 'array'
      },
      
      playerMax: {
          type: 'integer',
          required: true,
          defaultsTo: 10
      }
  }
};