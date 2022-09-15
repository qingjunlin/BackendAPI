const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
        unique: true
	},
    password: {
        type: String,
        required: true,
    },
	firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    wallet: {
        type: Number,
        default: 0,
    },
    sharesOwnCompany: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref:'Company'
    }],
    shares: [{ 
        type:Number,
    }],
    subscriptions: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref:'EndPoint'
    }]
}, {timestamps: true},)

const User = mongoose.model('StockUser', UserSchema)

module.exports = User