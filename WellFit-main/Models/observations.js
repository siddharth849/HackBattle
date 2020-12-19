const mongoose = require("mongoose");

const observationsSchema = new mongoose.Schema({
	DATE: {
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
	VALUE: {
		type: Number,
	},
	UNITS: {
		type: String,
	},
	TYPE: {
		type: String,
	},
});

module.exports = mongoose.model("Observations", observationsSchema);
