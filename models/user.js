/**
 * Created by Tea on 15.4.2016.
 */
//definicija nase tabele, nasega objekta, schema User-ja

var mongoose = require('mongoose');

var Schema = mongoose.Schema({      //nacrt za user-ja

    email       : { type:String, unique:true },  //ko bomo poskusali narediti uporabnika z istim email bomo dobili error
    password    : String,
    dateCreated : { type:Date, default:Date.now },  // za vsako ko ustvarimo novegta user-ja se nam ustvari datum

    emailToken  : String,
    verified    : { type:Boolean, default:false },           // po deafult-u ni potrjeno, ko naredimo novega uporabnika, se ni potrjeno: potrdili ga bomo naknadno
    tokens      : [{
        token   : {type:String},
        expires : {
            type: Date,
            default: function () {      // ustvarili smo default vrednost, kdaj bo token potekel

                return Date.now() + 1000 * 60 * 60 * 24 * 14
            }
        }
    }]

});

//iz te scheme definiramo model
mongoose.model('User', Schema);