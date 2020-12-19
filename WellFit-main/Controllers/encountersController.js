const Encounters = require("../Models/encounters");

exports.getEncountersByPatientId = async (req, res) => {
	try {
		const whatever = await Encounters.find({ PATIENT: req.params.id });

		return res.json(whatever);
	} catch (err) {
		return res.json({});
	}
};
