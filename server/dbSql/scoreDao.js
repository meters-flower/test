var scoreModel =require('../models/score');
var user = require('../models/user');
var courseModel = require('../models/course');
const dbHelper = require('../dbHelper');

exports.addScore = function(conditions,callback) {
    dbHelper.addData(scoreModel,conditions,function(result) {
        callback(result);
    });
}

exports.findScore = function(conditions,callback) {
    var fields   = {};
    var options  = {};
    dbHelper.findData(scoreModel,conditions,fields,options,function(result){
        callback(result);
    });
}
 
exports.findScoreRef = function(conditions,path,callback) {
    var path = path;
    var fields = {username:1, name:1};
    var options  = {sort:{_id:1}};
    dbHelper.findDataPopulation(scoreModel,conditions,path,fields,{},options,function(result){
        callback(result);
    });
}
 
exports.removeScore= function(conditions,callback) {
    dbHelper.removeData(scoreModel,conditions,function(result){
        callback(result);
    });
}
 
exports.updateScore = function(conditions,update,callback) {
    var options  = {};
    dbHelper.updateData(scoreModel,conditions,update,options,function(result){
        callback(result);
    });
}