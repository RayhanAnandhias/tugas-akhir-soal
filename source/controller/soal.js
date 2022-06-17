const { Document, Packer, Paragraph, Table, TextRun } = require('docx');
const fs = require('fs');
const mailer = require('../util/mail');
const path = require('path');

const {
  columnWidth,
  columnWidthPernyataan,
  createRow,
  createRowDiketahui
} = require('../util/docxToJsonReader');

exports.generateTemplate = async (req, res, next) => {
  try {
    const { soal, email } = req.body;
    const jumlahPilihan = 5;
    const tabel = [];
    const pilihan = [];

    tabel.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Jangan ubah teks tulisan yang diberi sorotan warna kuning !`,
            bold: true
          })
        ],
        spacing: {
          after: 200
        }
      })
    );

    for (let j = 0; j < jumlahPilihan; j++) {
      pilihan.push(
        createRow(
          ``,
          {
            children: [
              new TextRun({
                text: `${String.fromCharCode(65 + j)}`,
                highlight: 'yellow'
              })
            ]
          },
          `<Tulis opsi jawaban ${String.fromCharCode(65 + j)}>`
        )
      );
    }

    const recordDiketahui = [];

    for (let objSoal of soal) {
      if (objSoal.pernyataan !== 0) {
        if (!recordDiketahui.includes(objSoal.pernyataan)) {
          tabel.push(
            new Table({
              columnWidths: columnWidthPernyataan,
              rows: [
                createRowDiketahui(
                  {
                    children: [
                      new TextRun({
                        text: 'No Pernyataan',
                        highlight: 'yellow'
                      })
                    ]
                  },
                  {
                    children: [
                      new TextRun({
                        text: `${objSoal.pernyataan}`,
                        highlight: 'yellow'
                      })
                    ]
                  }
                ),
                createRowDiketahui(
                  {
                    children: [
                      new TextRun({
                        text: 'Pernyataan',
                        highlight: 'yellow'
                      })
                    ]
                  },
                  `<Tulis Pernyataan Soal di sini>`
                )
              ]
            })
          );
          tabel.push(new Paragraph(''));
          recordDiketahui.push(objSoal.pernyataan);
        }
      }

      tabel.push(
        new Table({
          columnWidths: columnWidth,
          rows: [
            createRow(
              {
                children: [
                  new TextRun({
                    text: `${objSoal.id}`,
                    highlight: 'yellow'
                  })
                ]
              },
              {
                children: [
                  new TextRun({
                    text: `Pertanyaan`,
                    highlight: 'yellow'
                  })
                ]
              },
              '<Tulis pertanyaan di sini>'
            ),
            ...pilihan,
            createRow(
              ``,
              {
                children: [
                  new TextRun({
                    text: `Kunci`,
                    highlight: 'yellow'
                  })
                ]
              },
              '<Tulis kunci jawaban (abjad nya saja)>'
            ),
            createRow(
              ``,
              {
                children: [
                  new TextRun({
                    text: `Pernyataan Terkait`,
                    highlight: 'yellow'
                  })
                ]
              },
              {
                children: [
                  new TextRun({
                    text: `${
                      objSoal.pernyataan !== 0 ? objSoal.pernyataan : `-`
                    }`,
                    highlight: 'yellow'
                  })
                ]
              }
            )
          ]
        })
      );
      tabel.push(new Paragraph(''));
    }

    const doc = new Document({
      sections: [
        {
          children: tabel
        }
      ]
    });

    const buffer = await Packer.toBuffer(doc);

    const timestamp = +new Date();
    const fileName = `${timestamp}-TemplateSoal-${email}.docx`;
    const filePath = path.join(__dirname, `../../public/soal/${fileName}`);

    fs.writeFile(filePath, buffer, (err) => {
      if (err) throw err;
    });

    //send email attachment
    const sentMessageInfo = await mailer.sendUrlTemplateSoal(
      fileName,
      filePath,
      email
    );

    fs.unlink(filePath, (err) => {
      if (err) throw err;
      console.log(`${fileName} was deleted`);
    });

    //response message
    res.status(200).json({
      message: `Berhasil mengirim file template soal ke email ${email}`,
      data: sentMessageInfo
    });
  } catch (error) {
    next(error);
  }
};
