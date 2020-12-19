const mongoose = require("mongoose");

const imagingStudiesSchema = new mongoose.Schema({
	Id: {
		type: String,
	},
	DATE: {
		type: Date,
	},
	PATIENT: {
		type: String,
	},
	ENCOUNTER: {
		type: String,
	},
	BODYSITE_CODE: {
		type: String,
	},
	BODYSITE_DESCRIPTION: {
		type: String,
	},
	MODALITY_CODE: {
		type: String,
	},
	MODALITY_DESCRIPTION: {
		type: String,
	},
	SOP_CODE: {
		type: String,
	},
	SOP_DESCRIPTION: {
		type: String,
	},
});

module.exports = mongoose.model("Imaging_studies", imagingStudiesSchema);
