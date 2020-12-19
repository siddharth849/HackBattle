const mongoose = require("mongoose");

const patientsSchema = new mongoose.Schema({
	Id: {
		type: String,
	},
	BIRTHDATE: {
		type: Date,
	},
	DEATHDATE: {
		type: String,
	},
	SSN: {
		type: String,
	},
	DRIVERS: {
		type: String,
	},
	PASSPORT: {
		type: String,
	},
	PREFIX: {
		type: String,
	},
	FIRST: {
		type: String,
	},
	LAST: {
		type: String,
	},
	SUFFIX: {
		type: String,
	},
	MAIDEN: {
		type: String,
	},
	MARITAL: {
		type: String,
	},
	RACE: {
		type: String,
	},
	ETHNICITY: {
		type: String,
	},
	GENDER: {
		type: String,
	},
	BIRTHPLACE: {
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
	COUNTY: {
		type: String,
	},
	ZIP: {
		type: Number,
	},
	LAT: {
		type: String,
	},
	LON: {
		type: String,
	},
	HEALTHCARE_EXPENSES: {
		type: Number,
	},
	HEALTHCARE_COVERAGE: {
		type: String,
	},
	EMAIL: {
		type: String,
	},
	PASSWORD: {
		type: String,
	},
	POINTS: {
		type: Number,
	},
	CALORIE: {
		type: Number,
	},
});

module.exports = mongoose.model("Patients", patientsSchema);
