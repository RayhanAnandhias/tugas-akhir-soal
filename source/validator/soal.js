const { body } = require('express-validator');

const generateTemplateValidator = () => {
  return [
    body('jumlahSoal')
      .exists()
      .withMessage('jumlahSoal tidak boleh kosong')
      .isNumeric()
      .withMessage('jumlah soal harus bertipe number'),
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
