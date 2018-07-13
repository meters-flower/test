var courseDao =require('../dbSql/courseDao');

/* 添加课程 */ 
exports.courseAddAction = function() {
    return function(req, res) {
        let name = req.query.name;
        if(!name) {
            res.send({
                status: false,
                msg: '请输入课程名称'
            });
            return;
        }  
        courseDao.findCourse({name: name}, function(result) {
            if(result.status && result.data.length >0) {
                res.send({
                    status: false,
                    msg: '该课程已存在'
                });
            }else {
                courseDao.addCourse({name: name},function(result){
                    res.json(result);
                });  
            }            
        }); 
    }
}

/* 课程信息查询 */
exports.courseFindAction = function() {
    return function(req, res) {
        courseDao.findCourse({},function(result){
            res.json(result);
        });
    }
}