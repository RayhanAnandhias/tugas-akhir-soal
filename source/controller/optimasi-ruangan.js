const { hitungTotal } = require('../util/ruangan');
const path = require('path');
const fs = require('fs');

const optimasiRuangan = async (req, res, next) => {
  try {
    const horizontalMeja = Number(req.body.horizontalMeja);
    const vertikalMeja = Number(req.body.vertikalMeja);
    const horizontalRuangan = Number(req.body.horizontalRuangan);
    const vertikalRuangan = Number(req.body.vertikalRuangan);
    const jumlahPeserta = Number(req.body.jumlahPeserta);
    const email = req.body.email;

    const filePathSoal = req.file.path;

    const result = hitungTotal(
      horizontalMeja,
      vertikalMeja,
      horizontalRuangan,
      vertikalRuangan,
      jumlahPeserta
    );

    res.status(200).json({
      message: 'Berhasil melakukan optimasi ruangan',
      data: {
        ruangan: {
          horizontalMeja,
          vertikalMeja,
          horizontalRuangan,
          vertikalRuangan,
          jumlahPeserta
        },
        email,
        OpsiLayoutKelas: result,
        filePathSoal
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  optimasiRuangan
};
