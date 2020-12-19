const express = require("express");
const { getDevices } = require("../Controllers/devicesController");

const router = express.Router();

router.get("/get-devices", getDevices);

module.exports = router;
