const { body } = require("express-validator");

const process = () => {
  return [
    body("panjangBaris")
      .exists()
      .withMessage("panjangBaris tidak boleh kosong")
      .isNumeric()
      .withMessage("nilai panjang baris harus bertipe number"),
    body("panjangKolom")
      .exists()
      .withMessage("panjangKolom tidak boleh kosong")
      .isNumeric()
      .withMessage("nilai panjang kolom harus bertipe number"),
    body("jarakBaris")
      .exists()
      .withMessage("jarakBaris tidak boleh kosong")
      .isNumeric()
      .withMessage("nilai jarak baris harus bertipe number"),
    body("jarakKolom")
      .exists()
      .withMessage("jarakKolom tidak boleh kosong")
      .isNumeric()
      .withMessage("nilai jarak kolom harus bertipe number"),
  ];
};

const processNTimes = () => {
  return [
    body("panjangBaris")
      .exists()
      .withMessage("panjangBaris tidak boleh kosong")
      .isNumeric()
      .withMessage("nilai panjang baris harus bertipe number"),
    body("panjangKolom")
      .exists()
      .withMessage("panjangKolom tidak boleh kosong")
      .isNumeric()
      .withMessage("nilai panjang kolom harus bertipe number"),
    body("jarakBaris")
      .exists()
      .withMessage("jarakBaris tidak boleh kosong")
      .isNumeric()
      .withMessage("nilai jarak baris harus bertipe number"),
    body("jarakKolom")
      .exists()
      .withMessage("jarakKolom tidak boleh kosong")
      .isNumeric()
      .withMessage("nilai jarak kolom harus bertipe number"),
    body("jumlahPercobaan")
      .exists()
      .withMessage("jumlahPercobaan tidak boleh kosong")
      .notEmpty()
      .withMessage("jumlahPercobaan tidak boleh kosong")
      .isNumeric()
      .withMessage("nilai jumlahPercobaan harus bertipe number"),
  ];
};

module.exports = {
  process,
  processNTimes
};
