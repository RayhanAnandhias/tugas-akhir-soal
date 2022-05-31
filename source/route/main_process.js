const express = require('express');
const controller = require('../controller/main_process');
const validator = require('../validator/main_process');
const validation = require('../middleware/validation');
const docxUploader = require('../middleware/docx-uploader');

const router = express.Router();

router.post(
  '/process',
  docxUploader,
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
