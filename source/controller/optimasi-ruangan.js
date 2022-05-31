const { hitungTotal } = require('../util/ruangan');
const path = require('path');

const optimasiRuangan = (req, res, next) => {
  try {
    const horizontalMeja = Number(req.body.horizontalMeja);
    const vertikalMeja = Number(req.body.vertikalMeja);
    const horizontalRuangan = Number(req.body.horizontalRuangan);
    const vertikalRuangan = Number(req.body.vertikalRuangan);
    const jumlahPeserta = Number(req.body.jumlahPeserta);

    // const filePath = req.file.path.replace(/\\/gi, '/');

    const listSoal = path.join(__dirname, '..', '..', req.file.path);
    // const listSoal = docxToJson(filepath)

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
        OpsiLayoutKelas: result,
        listSoal
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  optimasiRuangan
};
