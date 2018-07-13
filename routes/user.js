var express = require('express');
var router = express.Router();
var user = require('../server/controller/userCtrl');

function checkLogin(req, res, next ) {
    if(!req.session.user) {
        res.send({
            status: false,
            msg: '请先登录'
        });
    }else {
        next()
    }
}

router.post('/register',user.userAddAction());//注册

router.post('/login',user.loginAction());//登录

router.get('/logout',user.logoutAction());//退出登录

router.get('/getList',checkLogin);
router.get('/getList',user.userFindAction());

module.exports = router;