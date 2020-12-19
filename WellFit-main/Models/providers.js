const mongoose = require("mongoose");

const providersSchema = new mongoose.Schema({
	Id: {
		type: String,
	},
	ORGANIZATION: {
		type: String,
	},
	NAME: {
		type: String,
	},
	GENDER: {
		type: String,
	},
	SPECIALITY: {
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
		type: Number,
	},
	LAT: {
		type: Number,
	},
	LON: {
		type: Number,
	},
	UTILIZATION: {
		type: Number,
	},
});

module.exports = mongoose.model("Providers", providersSchema);
