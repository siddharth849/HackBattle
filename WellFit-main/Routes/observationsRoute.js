const express = require("express");
const {
	getObservationsByPatientId,
} = require("../Controllers/observationsController");

const router = express.Router();

router.get("/get-observations-by-patient-id/:id", getObservationsByPatientId);

module.exports = router;
