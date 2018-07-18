var express = require('express');
var router = express.Router();
var score = require('../server/controller/scoreCtrl');

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

router.post('/selectCourse',checkLogin);
router.post('/selectCourse',score.user_courseAddAction()); //选课

router.post('/addScore',checkLogin);
router.post('/addScore',score.user_scoreAddAction()); //录入成绩

router.get('/getScore',score.user_scoreFindRefAction()); //某人的课程成绩

module.exports = router;