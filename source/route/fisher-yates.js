const express = require("express");
const controller = require("../controller/fisher-yates");
const validator = require("../validator/fisher-yates");
const validation = require("../middleware/validation");

const router = express.Router();

router.post("/simulate-once", validator.simulateOnceValidator(), validation , controller.simulateOnce);

router.post("/simulate", validator.simulateNTimesValidator(), validation, controller.simulateNTimes );

router.post("/acak-soal", validator.acakSoal(), validation, controller.acakSoal);

router.post("/acak-percobaan", validator.acakSoalNTimes(), validation, controller.acakSoalNTimes);

module.exports = router;