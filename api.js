/**
 * Created by Tea on 13.4.2016.
 */
// pisemo route

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var guid = require('guid');
var middlewares = require('./middlewares');

exports.initRoutes = function (server) {
    
    console.log('API Routes Setup');

    //server.get('/', function (req,res) {
        //res.send('Hellow Tea');
    //});

    server.get('/api/projects', middlewares.authenticate, function (req,res) {

        res.send('Secret projects, you are: '+req.user.email);

    });

    server.post('/api/login', function (req, res) {

        var data = req.body;

        var email = data.email;
        var password = data.password;

        if(email === undefined){
            return res.status(400).send('No email provided');
        }
        if(password === undefined){
            return res.status(400).send('No password provided');
        }

        var User = mongoose.model('User');

        User.findOne({ email:email }, function(err, userDoc) {                 // UNIQUE IDENTIFIER uporabnika = email!

            //check if user is found
            if(userDoc) {

                bcrypt.compare(password, userDoc.password, function (err, result) {   // drugi parameter je geslo, ki je v bazi; ce je result TRUE se password in userDoc.password ujemata!

                    if (result) {

                        var token = guid.raw();                                 // ta funkcija nam omogoca da pridobimo neko unikatno vrednost

                        userDoc.tokens.push({ token:token});                    // v array, ki smo ga pripravili v user.js porinemo novi token

                        userDoc.save(function (err) {

                            if(!err) {
                                res.send({
                                    token: token                                         // token vrnemo nazaj v browser, hkrati bo shranjen v bazo
                                });
                            }else{
                                res.status(400).send(err);
                            }

                        });                                                

                    } else {
                        res.status(400).send('Email or password is wrong');
                    }
                });

            }else{

                res.status(400).send('Email or password is wrong');
            }
        });

    });

    server.post('/api/user', function (req, res) {

        var data = req.body;    // v req.body dobimo podatke, ki jih posljemo iz browser-ja. pricakujemo email, password

        var email = data.email;
        var password = data.password;

        //kako preverimo ce uporabnik obstaja/validacija?

        if(email === undefined){
            return res.status(400).send('No email provided');
        }
        if(password === undefined){
            return res.status(400).send('No password provided');
        }

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {    // hash = vrednost, ki jo zelimo shraniti v bazo

                //kako ustvarimo novega user-ja?

                var User = mongoose.model('User');

                var user = new User ({ email:email, password:hash });   //tukaj vstavimo hash, namesto gesla, od te tocke zgubimo dostop do gesla

                user.save(function (err) {

                    if(!err){
                        res.send(user);
                    }else{
                        console.log(err);
                        res.status(400).send(err);
                    }

                });

            });
        });
    });

};

