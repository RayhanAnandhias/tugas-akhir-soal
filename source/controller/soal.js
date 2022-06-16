const {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
  TextRun
} = require('docx');
const fs = require('fs');
const mailer = require('../util/mail');
const path = require('path');

const columnWidth = [612, 2091, 6111];
const columnWidthPernyataan = [1610, 7222];

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

    // fs.unlink(filePath, (err) => {
    //   if (err) throw err;
    //   console.log(`${fileName} was deleted`);
    // });

    //response message
    res.status(200).json({
      message: `Berhasil mengirim file template soal ke email ${email}`,
      data: sentMessageInfo
    });
  } catch (error) {
    next(error);
  }
};

const createRow = (contentCol1, contentCol2, contentCol3) => {
  try {
    return new TableRow({
      children: [
        new TableCell({
          width: {
            size: columnWidth[0],
            type: WidthType.DXA
          },
          children: [new Paragraph(contentCol1)]
        }),
        new TableCell({
          width: {
            size: columnWidth[1],
            type: WidthType.DXA
          },
          children: [new Paragraph(contentCol2)]
        }),
        new TableCell({
          width: {
            size: columnWidth[2],
            type: WidthType.DXA
          },
          children: [new Paragraph(contentCol3)]
        })
      ]
    });
  } catch (error) {
    console.log(error);
  }
};

const createRowDiketahui = (contentCol1, contentCol2) => {
  try {
    return new TableRow({
      children: [
        new TableCell({
          width: {
            size: columnWidthPernyataan[0],
            type: WidthType.DXA
          },
          children: [new Paragraph(contentCol1)]
        }),
        new TableCell({
          width: {
            size: columnWidthPernyataan[1],
            type: WidthType.DXA
          },
          children: [new Paragraph(contentCol2)]
        })
      ]
    });
  } catch (error) {
    console.log(error);
  }
};
