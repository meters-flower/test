var crypto = require('crypto'); 
var userDao =require('../dbSql/userDao');
 

/* 用户注册 */
exports.userAddAction = function() {
    return function(req, res) {
        var md5 = crypto.createHash('md5'),
        pwd = md5.update(req.body.pwd).digest('hex');        
        let user = {
            username : req.body.name,
            password: pwd
        }

        userDao.addUser(user,function(result){
            res.json(result);
        });    
       
    }
}

/* 用户信息查询 */ 
exports.userFindAction = function() {
    return function(req, res) {
        var conditions ={};
        userDao.findUser(conditions,function(result){
            res.json(result);
        });
    }
}

/* 注销用户 */ 
exports.userRemoveAction = function() {
    return function(req, res) {
        var conditions ={};
        userDao.removeUser(conditions,function(result){
            res.json(result);
        });
        //除了要删除user表里的内容，还要删除关联表(user_schoolClass)的内容
    }
}

/* 修改用户信息 */ 
exports.userUpdateAction = function() {
    return function (req, res) {
 
        var conditions = {};
        var update = {}//{$set : {userName:xxx}};
        var options = {}//{upsert:false};
 
        userDao.updateUser(conditions, update, options, function (result) {
            res.json(result);
        });
        //如果要更加关联对象，需要update user_schoolClass表中的userid 和scoolClassId
    }
}
