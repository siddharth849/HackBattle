const mongoose = require("mongoose");

const payer_transitionsSchema = new mongoose.Schema({
	PATIENT: {
		type: String,
	},
	START_YEAR: {
		type: Date,
	},
	END_YEAR: {
		type: Date,
	},
	PAYER: {
		type: String,
	},
	OWNERSHIP: {
		type: String,
	},
});

module.exports = mongoose.model("Payer_transitions", payer_transitionsSchema);
