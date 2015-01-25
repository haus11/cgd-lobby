module.exports = {
    
    playerSockets: {},
    
    addPlayerSocket: function(socket, player) {

        this.playerSockets['PLAYER' + player.id] = socket;
    },
    
    getPlayerSocket: function(player) {
        
        if(this.playerSockets.hasOwnProperty('PLAYER' + player.id)) {
            return this.playerSockets['PLAYER' + player.id];
        }
        
        return null;
    },
    
    removePlayerSocket: function(player) {

        if(this.playerSockets.hasOwnProperty('PLAYER' + player.id)) {
            delete this.playerSockets['PLAYER' + player.id];
        }
    },
    
    socketToID: function(sockets) {
        
        if(sockets instanceof Array) {
            
            var socketIDArray = [];
            
            for(var index = 0; index < sockets.length; ++index) {
                
                socketIDArray.push(sails.sockets.id(sockets[index]));
            }
            
            return socketIDArray;
            
        }
        else {
            
            return sails.sockets.id(sockets);
        }
    },

    onConnect: function(session, socket) {
        
        if(typeof session.player !== 'undefined' && session.serverID !== 'undefined') {   
            
            /*
             * TODO: Implement notification, that socket has an active game
             */
        }
        
        Server.watch(socket);

    },
    
    onDisconnect: function(session, socket) {

        if(typeof session.player !== 'undefined') {
            
            this.removePlayerSocket(session.player);
            
            if(typeof session.serverID !== 'undefined') {
                
                Server.findOne({id: session.serverID}).exec(function(error, server) {
                    
                    if(!error) {
                        
                        sails.sockets.emit(ConnectionService.socketToID(Server.subscribers(server.id)), EventService.SERVER_PLAYER_DISCONNECT, session.player);
                    }
                    else {
                        
                        sails.log.warn('Server participants can not get disconnect information for player, because server query failed', 'emit aborted');
                    }
                    
                });
            }
        }
        
        Server.unwatch(socket);
    }
    
};