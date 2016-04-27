/**
 * Created by Tea on 13.4.2016.
 */
//Kako sestavimo streznik?

var express = require('express');
var server = express();
var api = require('./api');
var database = require('./database');
var bodyParser = require('body-parser');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended:true }));

server.use('/', express.static('./public'));

server.listen(3050, function () {

    console.log('Server listening on port 3050');
    
    database.connect(function () {          //ko se povezava na bazo zvrsi zelo poklicati callback. TUKAJ VSTAVIMO function, v database.js pa poklicemo cb

        require('./models/user');           // del nase inicializacije je, da moramo require modele

        api.initRoutes(server);
    });

});