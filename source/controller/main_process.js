const { process, processNTimes } = require('../util/main_process');

exports.testReadJson = (req, res, next) => {
  try {
    const dataFile = req.file;
    const jsonObject = JSON.parse(req.file.buffer.toString());
    console.log(dataFile);
    res.status(200).json({
      message: 'success',
      data: { jsonObject, dataFile }
    });
  } catch (error) {
    next(error);
  }
};

exports.process = (req, res, next) => {
  try {
    const {
      panjangBaris,
      panjangKolom,
      jarakBaris,
      jarakKolom,
      listSoal,
      horizontalRuangan,
      vertikalRuangan,
      horizontalMeja,
      vertikalMeja,
      jumlahPeserta
    } = req.body;

    const result = process(
      {
        panjangBaris,
        panjangKolom,
        jarakBaris,
        jarakKolom
      },
      listSoal
    );

    res.status(200).json({
      message: 'Berhasil melakukan simulasi Fisher Yates + Graph Coloring',
      data: {
        ruangan: {
          horizontalRuangan,
          vertikalRuangan,
          horizontalMeja,
          vertikalMeja,
          jumlahPeserta
        },
        processResult: result
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.processNTimes = (req, res, next) => {
  try {
    const {
      panjangBaris,
      panjangKolom,
      jarakBaris,
      jarakKolom,
      listSoal,
      jumlahPercobaan
    } = req.body;
    const result = processNTimes(
      {
        panjangBaris,
        panjangKolom,
        jarakBaris,
        jarakKolom
      },
      listSoal,
      jumlahPercobaan
    );
    res.status(200).json({
      message:
        'Berhasil melakukan simulasi Fisher Yates + Graph Coloring sebanyak percobaan ' +
        jumlahPercobaan +
        ' kali',
      data: result
    });
  } catch (err) {
    next(err);
  }
};
