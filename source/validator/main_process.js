const { body } = require('express-validator');

const process = () => {
  return [
    body('panjangBaris')
      .exists()
      .withMessage('panjangBaris tidak boleh kosong')
      .isNumeric()
      .withMessage('nilai panjang baris harus bertipe number'),
    body('panjangKolom')
      .exists()
      .withMessage('panjangKolom tidak boleh kosong')
      .isNumeric()
      .withMessage('nilai panjang kolom harus bertipe number'),
    body('jarakBaris')
      .exists()
      .withMessage('jarakBaris tidak boleh kosong')
      .isNumeric()
      .withMessage('nilai jarak baris harus bertipe number'),
    body('jarakKolom')
      .exists()
      .withMessage('jarakKolom tidak boleh kosong')
      .isNumeric()
      .withMessage('nilai jarak kolom harus bertipe number'),
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

const processNTimes = () => {
  return [
    body('panjangBaris')
      .exists()
      .withMessage('panjangBaris tidak boleh kosong')
      .isNumeric()
      .withMessage('nilai panjang baris harus bertipe number'),
    body('panjangKolom')
      .exists()
      .withMessage('panjangKolom tidak boleh kosong')
      .isNumeric()
      .withMessage('nilai panjang kolom harus bertipe number'),
    body('jarakBaris')
      .exists()
      .withMessage('jarakBaris tidak boleh kosong')
      .isNumeric()
      .withMessage('nilai jarak baris harus bertipe number'),
    body('jarakKolom')
      .exists()
      .withMessage('jarakKolom tidak boleh kosong')
      .isNumeric()
      .withMessage('nilai jarak kolom harus bertipe number'),
    body('jumlahPercobaan')
      .exists()
      .withMessage('jumlahPercobaan tidak boleh kosong')
      .notEmpty()
      .withMessage('jumlahPercobaan tidak boleh kosong')
      .isNumeric()
      .withMessage('nilai jumlahPercobaan harus bertipe number')
  ];
};

module.exports = {
  process,
  processNTimes
};
