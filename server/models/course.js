var mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true }
});

const courseModel = mongoose.model('course', courseSchema);

module.exports = courseModel