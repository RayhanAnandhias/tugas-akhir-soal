const express = require('express');
const controller = require('../controller/main_process');
const validator = require('../validator/main_process');
const validation = require('../middleware/validation');

const router = express.Router();

router.post('/process', validator.process(), validation, controller.process);

router.post(
  '/process-multiple',
  validator.processNTimes(),
  validation,
  controller.processNTimes
);

module.exports = router;
