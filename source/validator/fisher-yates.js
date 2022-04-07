const { body } = require("express-validator");


const simulateOnceValidator = () => {;
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
    body("jumlahSoal")
      .exists()
      .withMessage("jumlahSoal tidak boleh kosong")
      .isNumeric()
      .withMessage("nilai jumlahSoal harus bertipe number"),
  ];
};

const simulateNTimesValidator = () => {
  return [
    body("panjangBaris")
      .exists()
      .withMessage("panjangBaris tidak boleh kosong")
      .notEmpty()
      .withMessage("panjangBaris tidak boleh kosong")
      .isNumeric()
      .withMessage("nilai panjang baris harus bertipe number"),
    body("panjangKolom")
      .exists()
      .withMessage("panjangKolom tidak boleh kosong")
      .notEmpty()
      .withMessage("panjangKolom tidak boleh kosong")
      .isNumeric()
      .withMessage("nilai panjang kolom harus bertipe number"),
    body("jumlahSoal")
      .exists()
      .withMessage("jumlahSoal tidak boleh kosong")
      .notEmpty()
      .withMessage("jumlahSoal tidak boleh kosong")
      .isNumeric()
      .withMessage("nilai jumlahSoal harus bertipe number"),
    body("jumlahPercobaan")
      .exists()
      .withMessage("jumlahPercobaan tidak boleh kosong")
      .notEmpty()
      .withMessage("jumlahPercobaan tidak boleh kosong")
      .isNumeric()
      .withMessage("nilai jumlahPercobaan harus bertipe number"),
  ];
};

const acakSoal = () => {
  return [
    body("panjangBaris")
      .exists()
      .withMessage("panjangBaris tidak boleh kosong")
      .notEmpty()
      .withMessage("panjangBaris tidak boleh kosong")
      .isNumeric()
      .withMessage("nilai panjang baris harus bertipe number"),
    body("panjangKolom")
      .exists()
      .withMessage("panjangKolom tidak boleh kosong")
      .notEmpty()
      .withMessage("panjangKolom tidak boleh kosong")
      .isNumeric()
      .withMessage("nilai panjang kolom harus bertipe number")
  ];
};

module.exports = {
  simulateNTimesValidator,
  simulateOnceValidator,
  acakSoal
}
