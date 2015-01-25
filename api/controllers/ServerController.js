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
            
        Game.findOne({id: gameID}).exec(function(error, game) {
            
            if(error) {

                return res.badRequest(error);
            }

            if(typeof game === 'object') {

                if(name === null) {

                    name = game.type + ' server';
                }

                if(maxPlayer === null) {

                    maxPlayer = 20;
                }

                Server.create({

                    name: name,
                    game: gameID,
                    playerMax: maxPlayer,
                    roomID: HashService.hash(name + new Date().getTime())

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

                                server.player.add(player.id);
                                server.save(function(error, server) {

                                    if(error) {

                                        return res.badRequest(error);
                                    }
                                    
                                    req.session.player = player;
                                    req.session.serverID = server.id;
                                    
                                    ConnectionService.addPlayerSocket(req.socket, player);
                                    sails.sockets.join(req.socket, server.roomID);
                                    
                                    Server.subscribe(req.socket, server);
                                    Server.publishCreate(server, req.socket);
                                    
                                    return res.json(server);
                                });
                            }
                        });
                    }
                });
            }
            else {

                return res.badRequest({message: 'Not a valid game.'});
            }
        });        
    },
    
    update: function(req, res) {
        
    },
    
    delete: function(req, res) {
        
    },
    
    leave: function(req, res) {
        
        if(typeof req.session.player !== 'undefined' && req.session.serverID !== 'undefined') {   
            
            Server.findOne({id: req.session.serverID}).exec(function(error, server) {
                
                if(error) {
                
                    return res.badRequest(error);
                }
                else if(typeof server !== 'undefined') {
                    
                    ConnectionService.removePlayerSocket(req.session.player);
                    Server.unsubscribe(req.socket, server);
                    sails.sockets.emit(ConnectionService.socketToID(Server.subscribers(server.id)), EventService.SERVER_PLAYER_LEAVE, req.session.player);
                    delete req.session.serverID;
                    
                    return res.json(server);
                }
                else {
                    
                    return res.badRequest({message: 'Server is not available any longer'});
                }
            }); 
        }
        else {
            
            return res.json({message: 'There is no valid session for this socket to leave a server'});
        }
    },
    
    rejoin: function(req, res) {
        
        if(typeof req.session.player !== 'undefined' && req.session.serverID !== 'undefined') {   
            
            Server.findOne({id: req.session.serverID}).exec(function(error, server) {
                
                if(error) {
                
                    return res.badRequest(error);
                }
                else if(typeof server !== 'undefined') {
                    
                    ConnectionService.addPlayerSocket(req.socket, req.session.player);
                    Server.subscribe(req.socket, server);
                    
                    return res.json(server);
                }
                else {
                    
                    return res.badRequest({message: 'Server is not available any longer'});
                }
            }); 
        }
        else {
            
            return res.json({message: 'There is no valid session for this socket to rejoin a server'});
        }
    },
    
    join: function(req, res) {

        var serverID = req.param('id');
        var playerName = req.param('name');

        if(typeof req.session.serverID !== 'undefined') {
            
            return res.badRequest({message: 'You are already participating in a game'});
        }
        
        if(playerName === null) {
            
            return res.badRequest({message: 'You need to specify a playername'});
        }

        Server.findOne({id: serverID}).populate('player').exec(function(error, server) {
            
            if(error) {
                
                return res.badRequest(error);
            }
            else if(typeof server !== 'undefined') {
                
                if(server.playerMax <= server.player.length - 1) {
                    
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

                       server.player.add(player.id);
                       
                       server.save(function(error, server) {

                            if(error) {

                                return res.badRequest(error);
                            }
                            
                            req.session.player = player;
                            req.session.serverID = server.id;
                            
                            ConnectionService.addPlayerSocket(req.socket, player);
                            
                            sails.sockets.join(req.socket, server.roomID);

                            sails.sockets.emit(ConnectionService.socketToID(Server.subscribers(server.id)), EventService.SERVER_PLAYER_JOIN, player);
                            Server.subscribe(req.socket, server);

                            return res.json(server);
                        });
                    }
                });
            }
            else {
                
                return res.notFound();
            }
        });
    }

};