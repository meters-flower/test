const courseModel = require('../models/course');
const dbHelper = require('../dbHelper');

exports.addCourse = function(conditions,callback) {
    dbHelper.addData(courseModel,conditions,function(result) {
        callback(result);
    });
};

exports.findCourse = function(conditions,callback) {
    var fields   = {};
    var options  = {};
 
    dbHelper.findData(courseModel,conditions,fields,options,function(result){
        callback(result);
    });
 
}
 
 exports.removeCourse = function(conditions,callback) {
    dbHelper.removeData(courseModel,conditions,function(result){
        callback(result);
    });
}
 
exports.updateCourse = function(conditions,update,options,callback) {
    dbHelper.updateData(courseModel,conditions,update,options,function(result){
        callback(result);
    });
}