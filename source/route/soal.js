const express = require('express');
const controller = require('../controller/soal');
const validator = require('../validator/soal');
const validation = require('../middleware/validation');

const router = express.Router();

router.post(
  '/',
  validator.generateTemplateValidator(),
  validation,
  controller.generateTemplate
);

module.exports = router;
