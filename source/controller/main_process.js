const { processMain, processNTimes } = require('../util/main_process');
const fs = require('fs');
const {
  docxToJson,
  generateRandomizeResult
} = require('../util/docxToJsonReader');
const path = require('path');
const AdmZip = require('adm-zip');
const mailer = require('../util/mail');

exports.processMain = async (req, res, next) => {
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
      jumlahPeserta,
      filePathSoal,
      email
    } = req.body;

    const listSoal = await docxToJson(
      path.join(__dirname, '..', '..', filePathSoal)
    );

    const result = processMain(
      {
        panjangBaris: Number(panjangBaris),
        panjangKolom: Number(panjangKolom),
        jarakBaris: Number(jarakBaris),
        jarakKolom: Number(jarakKolom)
      },
      listSoal
    );

    const hasilToDocx = await generateRandomizeResult(
      result.hasilAcakan.listPaket,
      email
    );

    //zip hasil docx acakan
    const zip = new AdmZip();

    for (const fileName of hasilToDocx) {
      zip.addLocalFile(path.join(__dirname, `../../public/soal/${fileName}`));
    }

    const fileZipName = `${+new Date()}-hasil-acak-soal-${email}.zip`;

    const zipFilePath = path.join(
      __dirname,
      `../../public/soal/${fileZipName}`
    );

    zip.writeZip(zipFilePath);

    for (const fileName of hasilToDocx) {
      fs.unlink(
        path.join(__dirname, `../../public/soal/${fileName}`),
        (err) => {
          if (err) throw err;
          console.log(`${fileName} was deleted`);
        }
      );
    }

    //send email attachment
    await mailer.sendFileHasilAcakan(fileZipName, zipFilePath, email);

    const urlSoal = `http://${process.env.TA_HOST}:${process.env.TA_PORT}/soal/${fileZipName}`;

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
        zipUrl: urlSoal
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
