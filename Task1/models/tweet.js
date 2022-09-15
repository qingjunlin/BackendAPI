const mongoose = require('mongoose')

const TweetSchema = new mongoose.Schema({
	content: {
		type: String,

	},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {timestamps: true},)

const Tweet = mongoose.model('Tweet', TweetSchema)

module.exports = Tweet