const mongoose = require("mongoose");

const medicationsSchema = new mongoose.Schema({
	START: {
		type: Date,
	},
	STOP: {
		type: Date,
	},
	PATIENT: {
		type: String,
	},
	PAYER: {
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
		type: Date,
	},
	PAYER_COVERAGE: {
		type: Number,
	},
	DISPENSES: {
		type: Number,
	},
	TOTALCOST: {
		type: Number,
	},
	REASONCODE: {
		type: Number,
	},
	REASONDESCRIPTION: {
		type: String,
	},
});

module.exports = mongoose.model("Medications", medicationsSchema);
