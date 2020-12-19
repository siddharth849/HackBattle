const Allergies = require("../Models/allergy");

const Patients = require("../Models/patients");

exports.getAllergies = async (req, res) => {
	try {
		const whatever = await Patients.find({}).limit(20);

		return res.json(whatever);
	} catch (err) {
		return res.json({});
	}
};
