var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

const scoreSchema = new mongoose.Schema({
	user:{type: Schema.Types.ObjectId, ref: 'user' },//定义类型为objectid ,ref是关联的模型名称
    course:{type: Schema.Types.ObjectId, ref: 'course' },
    score: {type: Number, default: 0}
});

const scoreModel = mongoose.model('score', scoreSchema);

module.exports = scoreModel