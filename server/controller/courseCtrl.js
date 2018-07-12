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
        }  
           
        courseDao.addSchoolClass({
            name: name
        },function(result){
            res.json(result);
        });
        res.end();
    }
}
