var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var image_Schema = new Schema({
	url: {type: String,required: true},
	fileName : {type: String,require: true},
});

module.exports = {image_model :mongoose.model('image_model', image_Schema)}
