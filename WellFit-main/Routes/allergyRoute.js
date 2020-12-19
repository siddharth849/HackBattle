const express = require("express");
const { getAllergies } = require("../Controllers/allergyController");

const router = express.Router();

router.get("/get-allergies", getAllergies);

module.exports = router;
