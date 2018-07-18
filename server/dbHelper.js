/**
 * 公共Add方法
 * @param model 要操作数据库的模型
 * @param conditions 增加的条件,如{id:xxx}
 * @param callback 回调方法
 */
exports.addData =function(model,conditions,callback) {
    model.create(conditions, function(err,result){
        if(err) {
            callback({status:false,msg:'add data fail'});
        } else {
            callback({status:true,msg:"save data success"});
        }
    }); 
}
 
/**
 * 公共update方法
 * @param model 要操作数据库的模型
 * @param conditions 增加的条件,如{id:xxx}
 * @param update 更新条件{set{id:xxx}}
 * @param options 
 * @param callback
 */
exports.updateData =function(model,conditions,update,options,callback) {
    model.update(conditions, update, options, function(err,result){
        if(err) {
            callback({status:false,msg:"update data fail"});
        } else {
            if(result.n!=0){
                callback({status:true,msg:"update data success"});
            }
            else{
                callback({status:false, msg: 'update fail:no this data!'});
            }
        }
    });
}
 
/**
 * 公共remove方法
 * @param model
 * @param conditions
 * @param callback
 */
exports.removeData =function(model,conditions,callback) {
    model.remove(conditions, function(err,result) {
        if (err) {
            callback({status: false, msg: "remove data fail"});
        } else {
            if(result.n!=0){
                callback({status: true, msg: "remove data success"});
            }
            else{
                callback({status:false, msg: 'remove fail:no this data!'});
            }
        }
    });
}
 
/**
 * 公共find方法 非关联查找
 * @param model
 * @param conditions
 * @param fields 查找时限定的条件，如顺序，某些字段不查找等
 * @param options
 * @param callback
 */
exports.findData =function(model,conditions,fields,options,callback) {
    model.find(conditions, fields, options, function(err, result){
        if(err) {
            callback({status: false, msg: "find data fail"});
        } else {
            if(result.length!=0){
                callback({status: true, msg: "find data success",data:result});
            }
            else{
                callback({status: false, msg: 'find fail:no this data!'});
            }
 
        }
    });
}
 
/**
 * 公共populate find方法  关联查找
 * @param model
 * @param conditions
 * @param path :The field need to be refilled （需要覆盖的字段）
 * @param fields :select fields (name -_id,Separated by a space field,In front of the field name plus "-"said not filled in)
 * @param refmodel （关联的字段，有path可为null）
 * @param options
 * @param callback
 */
exports.findDataPopulation =function(model,conditions,path,fields,refmodel,options,callback) {
    model.find(conditions)
    .populate(path,fields, refmodel,options)
    .exec(function(err, result) {
        if(err) {
            callback({status: false, msg: 'population find data fail'});
        } else {
            if(result.length!=0){
                callback({status: true, msg: 'population find data status',data:result});
            }
            else{
                callback({status: false, msg: 'population find fail:no this data!'});
            }
        }
    });
}
