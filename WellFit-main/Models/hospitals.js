const mongoose = require("mongoose");

const hospitalsSchema = new mongoose.Schema({
	ORGANIZATION_ID: {
		type: String,
	},
	NAME: {
		type: String,
	},
	ADDRESS: {
		type: String,
	},
	CITY: {
		type: String,
	},
	STATE: {
		type: String,
	},
	ZIP: {
		type: String,
	},
	LAT: {
		type: String,
	},
	LON: {
		type: String,
	},
	PHONE: {
		type: String,
	},
	DISEASE_DESCRIPTION: {
		type: String,
	},
	BASE_COST: {
		type: Number,
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
});

module.exports = mongoose.model("Hospitals", hospitalsSchema);
