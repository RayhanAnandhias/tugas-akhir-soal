const {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType
} = require('docx');
const fs = require('fs');
const mailer = require('../util/mail');
const path = require('path');

const columnWidth = [612, 2091, 6111];

exports.generateTemplate = async (req, res, next) => {
  try {
    const { jumlahSoal, email } = req.body;
    const jumlahPilihan = 5;
    const tabel = [];
    const pilihan = [];

    console.log('Jumlah pilihan adalah ' + jumlahPilihan);
    for (let j = 0; j < jumlahPilihan; j++) {
      pilihan.push(
        createRow(
          ``,
          `${String.fromCharCode(65 + j)}`,
          `<Tulis opsi jawaban ${String.fromCharCode(65 + j)}>`
        )
      );
    }
    console.log('Jumlah soal adalah ' + jumlahSoal);
    for (let i = 0; i < jumlahSoal; i++) {
      tabel.push(
        new Table({
          columnWidths: columnWidth,
          rows: [
            createRow(`${i + 1}`, 'Pertanyaan', '<Tulis pertanyaan di sini>'),
            ...pilihan,
            createRow(``, 'Kunci', '<Tulis kunci jawaban (abjad nya saja)>')
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
