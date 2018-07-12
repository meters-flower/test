var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

const scoreSchema = new mongoose.Schema({
	userId:{type: Schema.Types.ObjectId, ref: 'user' },//定义类型为objectid ,ref是关联的模型名称
    classId:{type: Schema.Types.ObjectId, ref: 'course' },
    score: Number
});

const scoreModel = mongoose.model('score', scoreSchema);

module.exports = scoreModel