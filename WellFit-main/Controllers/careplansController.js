const Careplans = require("../Models/careplans");

exports.getCareplansByPatientId = async (req, res) => {
	try {
		const whatever = await Careplans.find({ PATIENT: req.params.id });

		return res.json(whatever);
	} catch (err) {
		return res.json({});
	}
};
