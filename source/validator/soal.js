const { body } = require('express-validator');

const generateTemplateValidator = () => {
  return [
    body('soal')
      .exists()
      .isArray()
      .withMessage('soal harus dalam bentuk array'),
    body('email')
      .trim()
      .exists()
      .withMessage('email tidak boleh kosong')
      .isEmail()
      .withMessage('Email harus valid')
  ];
};

module.exports = {
  generateTemplateValidator
};
