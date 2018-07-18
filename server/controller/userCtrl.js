const crypto = require('crypto'); 
const userDao =require('../dbSql/userDao');

/* 用户注册 */
exports.userAddAction = function() {
    return function(req, res) {
        var md5 = crypto.createHash('md5'),
        pwd = md5.update(req.body.pwd).digest('hex');        
        let user = {
            username : req.body.name,
            password: pwd
        }

        if(!user.username) {
            res.send({
                status: false,
                msg: '用户名不能为空'
            });
            return;
        }
        if(!user.password) {
            res.send({
                status: false,
                msg: '密码不能为空'
            });
            return;
        }   

        userDao.findOne({username: user.username}, function(result) {
            if(result.status && result.data.length >0) {
                res.send({
                    status: false,
                    msg: '该用户名已注册！'
                });
            }else {
                userDao.addUser(user,function(result){
                    res.json(result);
                });    
            }
        });        
    }
}

/* 用户登录 */
exports.loginAction = function() {
    return function(req, res) {        
        var md5 = crypto.createHash('md5'),
        pwd = md5.update(req.body.pwd).digest('hex');        
        let user = {
            username : req.body.name,
            password: pwd
        }

        if(!user.username) {
            res.send({
                status: false,
                msg: '用户名不能为空'
            });
            return;
        }
        if(!user.password) {
            res.send({
                status: false,
                msg: '密码不能为空'
            });
            return;
        }   

        userDao.findOne(user, function(result) {
            if(result.status && result.data.length >0) {
                req.session.user = user.username;
                res.send({
                    status: true,
                    msg: '登录成功'
                }); 
            }else {
                res.send({
                    status: false,
                    msg: '用户名或者密码错误'
                });   
            }
        });        
    }
}

/* 用户退出 */
exports.logoutAction = function() {
    return function(req, res) {
        req.session.user = null;
        res.send({
            status: true,
            msg: ''
        });        
    }
}

/* 用户信息查询 */ 
exports.userFindAction = function() {
    return function(req, res) {
        userDao.findUser({},function(result){
            res.json(result);
        });            
    }
}

/* 注销用户 */ 
exports.userRemoveAction = function() {
    return function(req, res) {
        let id = req.query.id;
        userDao.removeUser({_id: id},function(result){
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
