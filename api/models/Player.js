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
          required: true
      },
      
      deleted: {
          type: 'boolean',
          defaultsTo: false
      },
      
      isMaster: {
          type: 'boolean',
          defaultsTo: false
      },
      
      server:{
            model:'server'
      }
  }
};
