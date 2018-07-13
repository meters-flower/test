var courseDao =require('../dbSql/courseDao');
var userDao =require('../dbSql/userDao');
var scoreDao =require('../dbSql/scoreDao');
 
/* 选课 */
exports.user_courseAddAction = function() {
    return function(req, res) {
        let obj = {
            userId: req.body.userId,
            courseId: req.body.courseId
        };

        userDao.findUser({_id: obj.userId}, function(result) {
            if(result.status) {
               courseDao.findCourse({_id: obj.courseId},function(result){
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
            userId: req.body.userId,
            courseId: req.body.courseId,
            score: req.body.score
        };

        scoreDao.findCourse({_id: obj.courseId},function(result){
           if(result.status){
                scoreDao.findScore(obj, function(result) {
                    if(result.status && result.data.length >0) {
                       scoreDao.updateData(obj,function(result){
                           res.json(result);
                       });                        
                    }else {
                        res.send({
                            status: false,
                            msg: ''
                        });
                    }            
                }); 
           }else {
                res.send(result);
           }
       });                
       
    }
}
 
 
/**
 * 查找方法，不关联查找
 * user_score find
 * @returns {Function}
 */
exports.user_scoreFindAction = function() {
    return function(req, res) {
        var conditions ={};
        scoreDao.findScore(conditions,function(result){
            res.json(result);
        });
    }
}
 
/* 查询课程成绩（关联查找）*/
exports.user_scoreFindRefAction = function() {
    return function(req, res) {
        var conditions ={};
        //用空格隔开要被填充的字段
        var path="userId classId"
        scoreDao.findScoreRef(conditions,path,function(result){
            res.json(result);
        });
    }
}