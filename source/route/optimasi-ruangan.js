const express = require('express');
const controller = require('../controller/optimasi-ruangan');
const validator = require('../validator/optimasi-ruangan');
const validation = require('../middleware/validation');
const jsonReader = require('../middleware/json-file-reader');

const router = express.Router();

router.post(
  '/',
  jsonReader,
  validator.optimasiRuanganValidator(),
  validation,
  controller.optimasiRuangan
);

module.exports = router;
