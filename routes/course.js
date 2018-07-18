var express = require('express');
var router = express.Router();
var course = require('../server/controller/courseCtrl');

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

router.get('/addCourse',checkLogin);
router.get('/addCourse',course.courseAddAction()); //添加课程

router.get('/getList',course.courseFindAction());  //课程列表

router.get('/delCourse',checkLogin);
router.get('/delCourse',course.courseRemoveAction()); //删除课程

module.exports = router;