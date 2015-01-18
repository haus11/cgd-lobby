module.exports = {
    
    player: {},

    addPlayer: function(socketID, player) {
        
        player[socketID] = player;
    },
    
    getPlayer: function(socketID) {
        
        return player[socketID];
    },
    
    emit: function(preferences, req) {
        
        
        if(typeof preferences === 'object') {
            
            
            if(preferences.hasOwnProperty('to') && (typeof preferences.to === 'string' || preferences instanceof Array) &&
               preferences.hasOwnProperty('event') && typeof preferences.event === 'string' &&
               preferences.hasOwnProperty('data') && typeof preferences.data === 'object') {
                
                
                if(typeof req === 'object') {
                    
                    var senderID = sails.sockets.id(req.socket);
                    
                    preferences.data.from = {
                    
                        socket_id: senderID,
                        player: this.getPlayer(senderID)
                    };
                }

                sails.sockets.emit(friendId, 'privateMessage', {from: req.session.userId, msg: 'Hi!'});
                
            }
            else {
                
                return false;
            }
        }
        
        return false;
    } 
    
};