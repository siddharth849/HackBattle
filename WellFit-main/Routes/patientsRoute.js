const express = require("express");
const auth = require("../util/auth");

const {
	postPatientLogin,
	postIsTokenValid,
	getCurrentPatient,
	getPatientById,
	postModifyPatientCaloriPointById,
} = require("../Controllers/patientsController");

const router = express.Router();

router.post("/login", postPatientLogin);
router.post("/is-token-valid", postIsTokenValid);

router.get("/get-current-patient", auth, getCurrentPatient);

router.get("/get-patient-by-id/:id", getPatientById);

router.post(
	"/post-modify-patient-calori-point-by-id/:id",
	postModifyPatientCaloriPointById
);

module.exports = router;
