var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	createTime: {type: Date,default: Date.now}
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel