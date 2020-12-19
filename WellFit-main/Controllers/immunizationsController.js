const Immunizations = require("../Models/immunizations");

exports.getImmunizationsByPatientId = async (req, res) => {
	try {
		const whatever = await Immunizations.find({ PATIENT: req.params.id });

		return res.json(whatever);
	} catch (err) {
		return res.json({});
	}
};
