var express = require('express');
var router = express.Router();
var score = require('../server/controller/scoreCtrl');

router.post('/selectCourse',score.user_courseAddAction()); //选课

module.exports = router;