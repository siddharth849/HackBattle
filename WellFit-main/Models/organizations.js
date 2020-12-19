const mongoose = require("mongoose");

const organizationsSchema = new mongoose.Schema({
	Id: {
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
		type: Number,
	},
	LAT: {
		type: Number,
	},
	LON: {
		type: Number,
	},
	PHONE: {
		type: Number,
	},
	REVENUE: {
		type: Number,
	},
	UTILIZATION: {
		type: Number,
	},
});

module.exports = mongoose.model("Organizations", organizationsSchema);
