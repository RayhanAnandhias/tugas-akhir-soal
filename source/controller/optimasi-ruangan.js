const { hitungTotal } = require('../util/ruangan');

const optimasiRuangan = (req, res, next) => {
  try {
    const {
      horizontalRuangan,
      vertikalRuangan,
      horizontalMeja,
      vertikalMeja,
      jumlahPeserta
    } = req.body;

    const result = hitungTotal(
      horizontalMeja,
      vertikalMeja,
      horizontalRuangan,
      vertikalRuangan,
      jumlahPeserta
    );

    res.status(200).json({
      message: 'Berhasil melakukan optimasi ruangan',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  optimasiRuangan
};
