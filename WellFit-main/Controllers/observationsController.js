const Observations = require("../Models/observations");

exports.getObservationsByPatientId = async (req, res) => {
	try {
		const whatever = await Observations.find({ PATIENT: req.params.id });

		return res.json(whatever);
	} catch (err) {
		return res.json({});
	}
};
