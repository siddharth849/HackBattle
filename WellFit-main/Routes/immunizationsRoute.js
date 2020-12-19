const express = require("express");
const {
	getImmunizationsByPatientId,
} = require("../Controllers/immunizationsController");

const router = express.Router();

router.get("/get-immunizations-by-patient-id/:id", getImmunizationsByPatientId);

module.exports = router;
