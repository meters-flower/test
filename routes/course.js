var express = require('express');
var router = express.Router();
var course = require('../server/controller/courseCtrl');

router.get('/addCourse',course.courseAddAction()); //添加课程

router.get('/getList',course.courseFindAction());  //课程列表

module.exports = router;