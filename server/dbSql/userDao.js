const userModel = require('../models/user');
const dbHelper = require('../dbHelper');

exports.addUser = function(conditions,callback) {
    dbHelper.addData(userModel,conditions,function(result) {
        callback(result);
    });
};

exports.findUser = function(conditions,callback) {
    var fields  = 'username createTime';
    var options  = {};
    dbHelper.findData(userModel,conditions,fields,options,function(result){
        callback(result);
    });
}

exports.findOne = function(conditions,callback) {
    var fields  = 'username';
    var options  = {};
    dbHelper.findData(userModel,conditions,fields,options,function(result){
        callback(result);
    });
}

exports.removeUser = function(conditions,callback) {
    dbHelper.removeData(userModel,conditions,function(result){
        callback(result);
    });
}
 
exports.updateUser = function(conditions,update,options,callback) {
    dbHelper.updateData(userModel,conditions,update,options,function(result){
        callback(result);
    });
}

