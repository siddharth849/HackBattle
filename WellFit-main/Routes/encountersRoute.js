const express = require("express");
const {
	getEncountersByPatientId,
} = require("../Controllers/encountersController");

const router = express.Router();

router.get("/get-encounters-by-patient-id/:id", getEncountersByPatientId);

module.exports = router;
