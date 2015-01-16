/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


module.exports = {
	
    
    create: function(req, res) {
        
    },
    
    update: function(req, res) {
        
    },
    
    delete: function(req, res) {
        
    },
    
    join: function(req, res) {
        
        var serverID = req.param('id');
        
        Server.findOne({id: serverID}).exec(function(error, server) {
            
            if(error) {
                
                return res.badRequest(error);
            }
            else if(typeof server !== 'undefined') {
                
                return res.json(server);
            }
            else {
                
                return res.notFound({message: 'Server with id ' + serverID + 'not found.'});
            }
        });
    }

};