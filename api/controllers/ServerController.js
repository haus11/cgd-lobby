/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


module.exports = {
    
    create: function(req, res) {
        
        var gameID      = req.param('game_id');
        var name        = req.param('name');
        var maxPlayer   = req.param('player_max');
        
        if(gameID !== null) {
            
            Game.findOne({id: gameID}).exec(function(error, game) {
                
                if(error) {
                    
                    return res.badRequest(error);
                }
                else {
                    
                    if(name === null) {
                        
                        name = Game.type + ' server';
                    }
                    
                    if(maxPlayer === null) {
                        
                        maxPlayer = 20;
                    }
                    
                    Server.create({
                        
                        name: name,
                        game: gameID,
                        playerMax: maxPlayer,
                        roomName: HashService.md5(name + new Date().getTime()),
                        
                    }).populate('player').exec(function(error, server) {
                        
                        if(error) {
                    
                            return res.badRequest(error);
                        }
                        else {
                            
                            Player.create({
                                
                                name: 'Game-Master',
                                isMaster: true,
                                server: server.id
                                
                            }).exec(function(error, player) {
                                
                                if(error) {
                    
                                    return res.badRequest(error);
                                }
                                else {
                                    
                                    //bind socket to room
                                    SocketService.addPlayer(sails.sockets.id(req.socket), player);
                                    sails.sockets.join(req.socket, server.roomName);
                                }
                            });
                        }
                    });
                }
            });
        }
        else {
            
            return res.badRequest({message: 'Not a valid game.'});
        }
        
        
    },
    
    update: function(req, res) {
        
    },
    
    delete: function(req, res) {
        
    },
    
    join: function(req, res) {
        
        var serverID = req.param('id');
        var playerName = req.param('name');
        
        if(playerName === null) {
            
            return res.badRequest({message: 'You need to specify a playername'});
        }

        Server.findOne({id: serverID}).populate('player').exec(function(error, server) {
            
            if(error) {
                
                return res.badRequest(error);
            }
            else if(typeof server !== 'undefined') {
                
                
                if(server.playersMax >= server.player.length) {
                    
                    return res.badRequest({message: 'Server is full.'});
                }
                
                if(server.started) {
                    
                    return res.badRequest({message: 'Game already started.'});
                }
                
                if(server.finished) {
                    
                    return res.badRequest({message: 'Game is finished.'});
                }
                
                /*
                 * Player can join
                 */
                
                Player.create({
                                
                    name: playerName,
                    isMaster: false,
                    server: serverID

                }).exec(function(error, player) {

                    if(error) {

                        return res.badRequest(error);
                    }
                    else {

                       server.player.add(player).save();
                       SocketService.addPlayer(sails.sockets.id(req.socket), player);
                       sails.sockets.join(req.socket, server.roomName);
                       return res.json(server);
                    }
                });
            }
            else {
                
                return res.notFound();
            }
        });
    }

};