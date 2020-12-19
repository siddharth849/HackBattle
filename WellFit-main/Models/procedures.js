const mongoose = require("mongoose");

const proceduresSchema = new mongoose.Schema({
	DATE: {
		type: "Date",
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
	REASONCODE: {
		type: Number,
	},
	REASONDESCRIPTION: {
		type: String,
	},
});

module.exports = mongoose.model("Procedures", proceduresSchema);
