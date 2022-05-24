const { body } = require('express-validator');

const optimasiRuanganValidator = () => {
  return [
    body('horizontalRuangan')
      .exists()
      .withMessage('horizontalRuangan tidak boleh kosong')
      .isNumeric()
      .withMessage('nilai horizontal ruangan harus bertipe number'),
    body('vertikalRuangan')
      .exists()
      .withMessage('vertikalRuangan tidak boleh kosong')
      .isNumeric()
      .withMessage('nilai vertikal ruangan harus bertipe number'),
    body('horizontalMeja')
      .exists()
      .withMessage('horizontalMeja tidak boleh kosong')
      .isNumeric()
      .withMessage('nilai horizontal meja harus bertipe number'),
    body('vertikalMeja')
      .exists()
      .withMessage('vertikalMeja tidak boleh kosong')
      .isNumeric()
      .withMessage('nilai vertikal meja harus bertipe number'),
    body('jumlahPeserta')
      .exists()
      .withMessage('jumlahPeserta tidak boleh kosong')
      .isNumeric()
      .withMessage('nilai jumlah peserta harus bertipe number')
  ];
};

module.exports = {
  optimasiRuanganValidator
};
