const tabletojson = require('tabletojson').Tabletojson;
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const docx = require('docx');
const { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType } =
  docx;

const columnWidth = [612, 2091, 6111];

const docxToJson = async (filePath) => {
  const resultConvert = await mammoth.convertToHtml({ path: filePath });

  fs.writeFile(`${filePath}.html`, resultConvert.value, (err) => {
    if (err) throw err;
  });

  const extracted = tabletojson.convert(resultConvert.value);

  const kunjawIndex = extracted[0].length - 1;
  const result = extracted.map((value, index) => {
    const currentSoal = extracted[index];
    const pilihanArray = currentSoal.filter(
      (valueCurrentSoal, currentIndex) => {
        return currentIndex !== kunjawIndex && currentIndex !== 0;
      }
    );

    let answerIndexInPilihanArray = null;

    const curPilihanArray = pilihanArray.map((pilihanValue, curIdx) => {
      if (currentSoal[kunjawIndex][2] === pilihanValue[1]) {
        answerIndexInPilihanArray = curIdx;
      }
      return pilihanValue[2];
    });

    return {
      id: index + 1,
      question: currentSoal[0][2],
      option: curPilihanArray,
      answer: answerIndexInPilihanArray
    };
  });

  fs.unlink(`${filePath}.html`, (err) => {
    if (err) throw err;
    console.log(`${filePath} was deleted`);
  });

  return result;
};

const generateRandomizeResult = async (soalCollection, email) => {
  try {
    const listNameFile = [];
    // ini iterasi untuk kumpulan soal nya (1 array 1 docx)
    for (const [l, soal] of soalCollection.entries()) {
      //ini iterasi untuk butir soalnya
      let tabel = [];
      for (const [m, noSoal] of soal.entries()) {
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

      let docName = `${+new Date()}-hasil-acak-paket${l + 1}(${email}).docx`;

      listNameFile.push(docName);

      fs.writeFileSync(
        path.join(__dirname, `../../public/soal/${docName}`),
        buffer
      );
    }
    return listNameFile;
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

module.exports = {
  docxToJson,
  generateRandomizeResult
};
