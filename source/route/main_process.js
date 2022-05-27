const express = require('express');
const controller = require('../controller/main_process');
const validator = require('../validator/main_process');
const validation = require('../middleware/validation');
const jsonReader = require('../middleware/json-file-reader');

const router = express.Router();

router.post(
  '/process',
  jsonReader,
  validator.processMain(),
  validation,
  controller.processMain
);

router.post(
  '/process-multiple',
  validator.processNTimes(),
  validation,
  controller.processNTimes
);

module.exports = router;
