const express = require("express");
const {
	getMedicationsByPatientId,
} = require("../Controllers/medicationsController");

const router = express.Router();

router.get("/get-medications-by-patient-id/:id", getMedicationsByPatientId);

module.exports = router;
