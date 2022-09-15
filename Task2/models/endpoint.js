const mongoose = require('mongoose')

const EndPointSchema = new mongoose.Schema({
	name: {
		type: String,
        required: true,
	},
    subscribers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    companies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
    }],
    liverates: [{
        type: Number,
    }]

}, {timestamps: true},)

const EndPoint = mongoose.model('EndPoint', EndPointSchema)

module.exports = EndPoint