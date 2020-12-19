const express = require("express");
const {
	getConditionsByPatientId,
} = require("../Controllers/conditionsController");

const router = express.Router();

router.get("/get-conditions-by-patient-id/:id", getConditionsByPatientId);

module.exports = router;
