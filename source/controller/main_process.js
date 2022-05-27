const { processMain, processNTimes } = require('../util/main_process');
const FileSystem = require('fs');

exports.processMain = (req, res, next) => {
  try {
    const {
      panjangBaris,
      panjangKolom,
      jarakBaris,
      jarakKolom,
      horizontalRuangan,
      vertikalRuangan,
      horizontalMeja,
      vertikalMeja,
      jumlahPeserta
    } = req.body;

    const listSoal = JSON.parse(req.file.buffer.toString());

    const result = processMain(
      {
        panjangBaris: Number(panjangBaris),
        panjangKolom: Number(panjangKolom),
        jarakBaris: Number(jarakBaris),
        jarakKolom: Number(jarakKolom)
      },
      listSoal
    );

    const timestamp = +new Date();
    const fileJsonName = `${timestamp}-HasilPengacakanSoal.json`;

    FileSystem.writeFile(
      `public/soal/${fileJsonName}`,
      JSON.stringify(result.hasilAcakan.listPaket),
      (err) => {
        if (err) throw err;
      }
    );

    const urlSoal = `http://${process.env.TA_HOST}:${process.env.TA_PORT}/soal/${fileJsonName}`;

    console.log(urlSoal);

    res.status(200).json({
      message: 'Berhasil melakukan simulasi Fisher Yates + Graph Coloring',
      data: {
        ruangan: {
          horizontalRuangan: Number(horizontalRuangan),
          vertikalRuangan: Number(vertikalRuangan),
          horizontalMeja: Number(horizontalMeja),
          vertikalMeja: Number(vertikalMeja),
          jumlahPeserta: Number(jumlahPeserta)
        },
        processResult: result,
        jsonUrl: urlSoal
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
