const fs = require('fs');
const path = require('path');
const docx = require('docx');
const { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType } =
  docx;

const columnWidth = [612, 2091, 6111];

const generateSoal = async () => {
  try {
    const soalCollection = require('./soal100.json');
    console.log(soalCollection);
    const result = await generateRandomizeResult(soalCollection);
    console.log('success generate: ' + result);
  } catch (error) {
    console.log(error);
  }
};

const generateRandomizeResult = async (soalCollection) => {
  try {
    //ini iterasi untuk butir soalnya
    let tabel = [];
    for (const [m, noSoal] of soalCollection.entries()) {
      let pilihan = [];
      let kunjaw = `${String.fromCharCode(65 + noSoal.answer)}`;

      for (let j = 0; j < noSoal.option.length; j++) {
        pilihan.push(
          createRow(``, `${String.fromCharCode(65 + j)}`, noSoal.option[j])
        );
      }

      tabel.push(
        new Table({
          columnWidths: columnWidth,
          rows: [
            createRow(`${m + 1}`, 'Pertanyaan', noSoal.question),
            ...pilihan,
            createRow(``, 'Kunci', kunjaw)
          ]
        })
      );
      tabel.push(new Paragraph(''));
    }

    let doc = new Document({
      sections: [
        {
          children: tabel
        }
      ]
    });

    let buffer = await Packer.toBuffer(doc);

    let docName = `${+new Date()}-soal${soalCollection.length}.docx`;

    fs.writeFileSync(
      path.join(__dirname, `../generate-soal/${docName}`),
      buffer
    );

    return docName;
  } catch (error) {
    console.log(error);
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

generateSoal();
