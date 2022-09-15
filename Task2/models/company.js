const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema({
	name: {
		type: String,
        required: true,
	},
    totalShare: {
        type: Number,
        required: true,
    },
    sharesDistribtion: [{
        type: Number,
    }],
    sharesOwners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    liverates: {
        type: Number,
        required: true,
    }
}, {timestamps: true},)

const Company = mongoose.model('Company', CompanySchema)

module.exports = Company