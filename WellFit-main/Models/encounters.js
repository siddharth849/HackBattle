const mongoose = require("mongoose");

const encountersSchema = new mongoose.Schema({
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
	ORGANIZATION: {
		type: String,
	},
	PROVIDER: {
		type: String,
	},
	PAYER: {
		type: String,
	},
	ENCOUNTERCLASS: {
		type: String,
	},
	CODE: {
		type: Number,
	},
	DESCRIPTION: {
		type: String,
	},
	BASE_ENCOUNTER_COST: {
		type: Number,
	},
	TOTAL_CLAIM_COST: {
		type: Number,
	},
	PAYER_COVERAGE: {
		type: Number,
	},
	REASONCODE: {
		type: Number,
	},
	REASONDESCRIPTION: {
		type: String,
	},
});

module.exports = mongoose.model("Encounters", encountersSchema);
