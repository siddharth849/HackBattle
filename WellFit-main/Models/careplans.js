const mongoose = require("mongoose");

const careplansSchema = new mongoose.Schema({
	Id: {
		type: String,
	},
	START: {
		type: Date,
	},
	STOP: {
		type: Date,
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
	REASONCODE: {
		type: Number,
	},
	REASONDESCRIPTION: {
		type: String,
	},
});

module.exports = mongoose.model("Careplans", careplansSchema);
