const express = require('express');
const controller = require('../controller/optimasi-ruangan');
const validator = require('../validator/optimasi-ruangan');
const validation = require('../middleware/validation');

const router = express.Router();

router.post(
  '/',
  validator.optimasiRuanganValidator(),
  validation,
  controller.optimasiRuangan
);

module.exports = router;
