const mongoose = require("mongoose");

const devicesSchema = new mongoose.Schema({
	START: {
		type: Date,
	},
	STOP: {
		type: String,
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
	UDI: {
		type: String,
	},
});

module.exports = mongoose.model("Devices", devicesSchema);
