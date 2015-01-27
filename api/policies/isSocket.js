module.exports = function isSocket (req, res, next) {
    
    if(req.isSocket) {
        
        next();
    }
    else {
        
        res.json({message: 'No Socket!'});
    }
};