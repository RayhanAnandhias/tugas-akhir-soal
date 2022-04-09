const { process, processNTimes } = require("../util/main_process");

exports.process = (req, res, next) => {
  try {
    const { panjangBaris, panjangKolom, jarakBaris, jarakKolom, listSoal } =
      req.body;
    const result = process(
      {
        panjangBaris,
        panjangKolom,
        jarakBaris,
        jarakKolom,
      },
      listSoal
    );
    res.status(200).json({
      message: "Berhasil melakukan simulasi Fisher Yates + Graph Coloring",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

exports.processNTimes = (req, res, next) => {
    try {
      const { panjangBaris, panjangKolom, jarakBaris, jarakKolom, listSoal, jumlahPercobaan } =
        req.body;
      const result = processNTimes(
        {
          panjangBaris,
          panjangKolom,
          jarakBaris,
          jarakKolom,
        },
        listSoal,
        jumlahPercobaan
      );
      res.status(200).json({
        message: "Berhasil melakukan simulasi Fisher Yates + Graph Coloring sebanyak percobaan " + jumlahPercobaan + " kali",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
