const express = require('express');
const controller = require('../controller/optimasi-ruangan');
const validator = require('../validator/optimasi-ruangan');
const validation = require('../middleware/validation');
const docxUploader = require('../middleware/docx-uploader');

const router = express.Router();

router.post(
  '/',
  docxUploader,
  validator.optimasiRuanganValidator(),
  validation,
  controller.optimasiRuangan
);

module.exports = router;
