const Conditions = require("../Models/conditions");

exports.getConditionsByPatientId = async (req, res) => {
	try {
		const whatever = await Conditions.find({ PATIENT: req.params.id });

		return res.json(whatever);
	} catch (err) {
		return res.json({});
	}
};
