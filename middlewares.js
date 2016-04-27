var mongoose = require('mongoose');

// na podlagi token-a bomo ugotovili kateri User je
//edini podatke, ki smo ga dobili y req je token, nobenega mail-a nimamo
//ce vbomo imeli rpravi token bo req sel skozi in pride (v api.js) noter (server.get: /api/projects)

exports.authenticate = function (req,res,next) {

    var token = req.headers.authorization;
    var User = mongoose.model('User');
    
    //$gt - native mongo operation - greater than
    User.findOne({ 'tokens.token': token, 'tokens.expires':{ $gt : Date.now() }}, function (err, userDoc) {

        if(userDoc){
            req.user = userDoc;
            next();
        }else{
            res.status(401).send('You are not authorized');
        }

    });
};