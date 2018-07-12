var express = require('express');
var router = express.Router();
var course = require('../server/controller/courseCtrl');

router.get('/addCourse',course.courseAddAction());

module.exports = router;