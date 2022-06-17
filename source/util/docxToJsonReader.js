const tabletojson = require('tabletojson').Tabletojson;
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const docx = require('docx');
const {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
  TextRun
} = docx;

const columnWidth = [612, 2091, 6111];
const columnWidthPernyataan = [1610, 7222];

const docxToJson = async (filePath) => {
  try {
    const resultConvert = await mammoth.convertToHtml({ path: filePath });

    fs.writeFile(`${filePath}.html`, resultConvert.value, (err) => {
      if (err) throw err;
    });

    const extracted = tabletojson.convert(resultConvert.value);

    const newStructureSoal = [];
    const kunjawIndex = 6;
    const recordPernyataanKosong = [];

    for (let i = 0; i < extracted.length; i++) {
      if (extracted[i].length === 2) {
        let arrSoal = [];
        for (let [j, v] of extracted.entries()) {
          if (v.length === 2) continue;
          if (v[7][2] !== extracted[i][0][1] && v[7][2] !== '-') continue;

          let currentSoal = v;
          let pilihanArray = currentSoal.filter(
            (valueCurrentSoal, currentIndex) => {
              return (
                currentIndex !== kunjawIndex &&
                currentIndex !== 0 &&
                currentIndex !== 7
              );
            }
          );
          let answerIndexInPilihanArray = null;

          let curPilihanArray = pilihanArray.map((pilihanValue, curIdx) => {
            if (currentSoal[kunjawIndex][2] === pilihanValue[1]) {
              answerIndexInPilihanArray = curIdx;
            }
            return pilihanValue[2];
          });

          let objSoal = {
            id: currentSoal[0][0],
            question: currentSoal[0][2],
            option: curPilihanArray,
            answer: answerIndexInPilihanArray
          };

          if (v[7][2] === '-') {
            if (
              recordPernyataanKosong.filter((e) => e.id === objSoal.id)
                .length === 0
            )
              recordPernyataanKosong.push(objSoal);
          } else {
            arrSoal.push(objSoal);
          }
        }

        newStructureSoal.push({
          idPernyataan: extracted[i][0][1],
          pernyataan: extracted[i][1][1],
          soal: arrSoal
        });
      }
    }

    if (recordPernyataanKosong.length > 0) {
      newStructureSoal.push({
        idPernyataan: 0,
        pernyataan: '',
        soal: recordPernyataanKosong
      });
    }

    fs.unlink(`${filePath}.html`, (err) => {
      if (err) throw err;
      console.log(`${filePath}.html was deleted`);
    });

    fs.unlink(`${filePath}`, (err) => {
      if (err) throw err;
      console.log(`${filePath} was deleted`);
    });

    return newStructureSoal;
  } catch (error) {
    return error;
  }
};

const generateRandomizeResult = async (soalCollection) => {
  try {
    const listNameFile = [];

    // ini iterasi untuk kumpulan soal nya (1 array 1 docx), iterasi utk paket soal nya
    for (const [l, paket] of soalCollection.entries()) {
      let tabel = [];
      let countSoal = 0;
      let countPernyataan = 0;

      //iterasi untuk groupSoal
      for (const groupSoal of paket) {
        if (groupSoal.idPernyataan !== 0) {
          let minCakupan = countSoal + 1;
          let maxCakupan = countSoal + groupSoal.soal.length;

          tabel.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `Tinjau pernyataan No. ${++countPernyataan} di bawah ini untuk menjawab pertanyaan No. ${minCakupan}-${maxCakupan}`,
                  bold: true
                })
              ]
            })
          );

          tabel.push(new Paragraph(''));

          tabel.push(
            new Table({
              columnWidths: columnWidthPernyataan,
              rows: [
                createRowDiketahui(
                  {
                    children: [
                      new TextRun({
                        text: 'No Pernyataan'
                      })
                    ]
                  },
                  {
                    children: [
                      new TextRun({
                        text: `${countPernyataan}`
                      })
                    ]
                  }
                ),
                createRowDiketahui(
                  {
                    children: [
                      new TextRun({
                        text: 'Pernyataan'
                      })
                    ]
                  },
                  `${groupSoal.pernyataan}`
                )
              ]
            })
          );

          tabel.push(new Paragraph(''));
        }

        //iterasi untuk butir nomor soal
        for (const butirSoal of groupSoal.soal) {
          let pilihan = [];
          let kunjaw = `${String.fromCharCode(65 + butirSoal.answer)}`;

          for (let j = 0; j < 5; j++) {
            pilihan.push(
              createRow(
                ``,
                {
                  children: [
                    new TextRun({
                      text: `${String.fromCharCode(65 + j)}`
                    })
                  ]
                },
                `${butirSoal.option[j]}`
              )
            );
          }

          tabel.push(
            new Table({
              columnWidths: columnWidth,
              rows: [
                createRow(`${++countSoal}`, 'Pertanyaan', butirSoal.question),
                ...pilihan,
                createRow(``, 'Kunci', kunjaw)
              ]
            })
          );
          tabel.push(new Paragraph(''));
        }
      }

      let doc = new Document({
        sections: [
          {
            children: tabel
          }
        ]
      });

      let buffer = await Packer.toBuffer(doc);

      let docName = `${+new Date()}-hasil-acak-paket${l + 1}.docx`;

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

module.exports = {
  docxToJson,
  generateRandomizeResult,
  createRow,
  createRowDiketahui,
  columnWidth,
  columnWidthPernyataan
};
