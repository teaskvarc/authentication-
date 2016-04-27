/**
 * Created by Tea on 15.4.2016.
 */
var mongoose = require('mongoose');

exports.connect = function (cb) {

    mongoose.connect('mongodb://localhost/sae-auth');

    mongoose.connection.on('error', function (err) {

        console.log('Error:', err);
    });

    mongoose.connection.once('open', function () {

        console.log('Connection open');

        if(cb){
            cb();
        }

    });

};