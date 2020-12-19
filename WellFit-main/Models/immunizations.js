const mongoose = require("mongoose");

const immunizationsSchema = new mongoose.Schema({
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
	BASE_COST: {
		type: Number,
	},
});

module.exports = mongoose.model("Immunizations", immunizationsSchema);
