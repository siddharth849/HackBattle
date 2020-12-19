const mongoose = require("mongoose");

const conditionsSchema = new mongoose.Schema({
	START: {
		type: Date,
	},
	STOP: {
		type: String,
	},
	PATIENT: {
		type: String,
	},
	ENCOUNTER: {
		type: String,
	},
	CODE: {
		type: Number,
	},
	DESCRIPTION: {
		type: String,
	},
});

module.exports = mongoose.model("Conditions", conditionsSchema);
