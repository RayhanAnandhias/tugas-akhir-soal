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
      jumlahPeserta
    } = req.body;

    const filePathSoal = req.file.path;

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
      result.hasilAcakan.listPaket
    );

    //zip hasil docx acakan
    const zip = new AdmZip();

    for (const fileName of hasilToDocx) {
      zip.addLocalFile(path.join(__dirname, `../../public/soal/${fileName}`));
    }

    const fileZipName = `${+new Date()}-hasil-acak-soal.zip`;

    const zipPath = `public/soal/${fileZipName}`;

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

    const urlSoal = `http://${process.env.TA_HOST}${
      process.env.TA_PORT ? `:` + process.env.TA_PORT : ``
    }/soal/${fileZipName}`;

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
        zipUrl: urlSoal,
        zipFilePath: zipPath
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

exports.sendResult = async (req, res, next) => {
  try {
    const { zipFilePath, email } = req.body;
    const dashboardPdf = req.file.path;

    const zipPath = path.join(__dirname, `../../${zipFilePath}`);
    const dashboardPdfPath = path.join(__dirname, '..', '..', dashboardPdf);

    const zipFileName = path.basename(zipPath);
    const dashboardPdfPathName = path.basename(dashboardPdfPath);

    // send email
    const resultEmail = await mailer.sendFiles(
      { fileName: zipFileName, filePath: zipPath },
      { fileName: dashboardPdfPathName, filePath: dashboardPdfPath },
      email
    );

    fs.unlink(zipPath, (err) => {
      if (err) throw err;
      console.log(`success delete file zip hasil acakan`);
    });

    fs.unlink(dashboardPdfPath, (err) => {
      if (err) throw err;
      console.log(`success delete file pdf dashboard`);
    });

    res.status(200).json({
      message: `Berhasil mengirim hasil ke email ${email}`,
      data: resultEmail
    });
  } catch (error) {
    next(error);
  }
};
