const Devices = require("../Models/devices");

exports.getDevices = async (req, res) => {
	try {
		const whatever = await Devices.find({});

		return res.json(whatever);
	} catch (err) {
		return res.json({});
	}
};
