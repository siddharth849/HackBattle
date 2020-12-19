const Hospitals = require("../Models/hospitals");

exports.getHospitalsByDiseaseName = async (req, res) => {
	try {
		const whatever = await Hospitals.find({
			DISEASE_DESCRIPTION: req.body.disease,
		}).limit(30);

		return res.json(whatever);
	} catch (err) {
		return res.json({});
	}
};
