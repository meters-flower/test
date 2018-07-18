const courseDao =require('../dbSql/courseDao');
const userDao =require('../dbSql/userDao');
const scoreDao =require('../dbSql/scoreDao');
 
/* 选课 */
exports.user_courseAddAction = function() {
    return function(req, res) {
        let obj = {
            user: req.body.userId,
            course: req.body.courseId
        };

        userDao.findUser({_id: obj.user}, function(result) {
            if(result.status) {
               courseDao.findCourse({_id: obj.course},function(result){
                   if(result.status){
                        scoreDao.findScore(obj, function(result) {
                            if(result.status && result.data.length >0) {
                                res.send({
                                    status: false,
                                    msg: '您已选择了该课程'
                                });
                            }else {
                               scoreDao.addScore(obj,function(result){
                                   res.json(result);
                               });
                            }            
                        }); 
                   }else {
                        res.send(result);
                   }
               });                
            }else {
                res.send(result);
            }
        });
    }
}

/* 录入成绩 */
exports.user_scoreAddAction = function() {
    return function(req, res) {   
        let obj = {
            user: req.body.userId,
            course: req.body.courseId
        };

        scoreDao.updateScore(obj, {score: req.body.score}, function(result) {
            res.json(result);                             
        });  
    }
}
 
 
/* 某人所有课程成绩（关联查找）*/
exports.user_scoreFindRefAction = function() {
    return function(req, res) {
        var conditions ={
            user: req.query.userId
        };
        var path="course";
        scoreDao.findScoreRef(conditions,path,function(result){
            res.json(result);
        });
    }
}