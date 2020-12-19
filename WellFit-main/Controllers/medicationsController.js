const Medications = require("../Models/medications");

exports.getMedicationsByPatientId = async (req, res) => {
	try {
		const whatever = await Medications.find({ PATIENT: req.params.id });

		return res.json(whatever);
	} catch (err) {
		return res.json({});
	}
};
