const express = require("express");
const {
	getHospitalsByDiseaseName,
} = require("../Controllers/hospitalsController");

const router = express.Router();

router.post("/get-hospitals-by-disease-name", getHospitalsByDiseaseName);

module.exports = router;
