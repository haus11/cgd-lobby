module.exports = {

    bcrypt: require('bcrypt'),
    
    hash: function(plain) {
        
        if(this.bcrypt !== null && typeof plain === 'string') {

            return this.bcrypt.hashSync(plain, 10);
        }
        
        return false;
    }
};