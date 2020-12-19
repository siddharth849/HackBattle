const express = require("express");
const {
	getCareplansByPatientId,
} = require("../Controllers/careplansController");

const router = express.Router();

router.get("/get-careplans-by-patient-id/:id", getCareplansByPatientId);

module.exports = router;
