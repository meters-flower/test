var mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
	name: String
});

const courseModel = mongoose.model('course', courseSchema);

module.exports = courseModel