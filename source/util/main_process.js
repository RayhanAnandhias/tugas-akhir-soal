const {acakSoal, acakSoalNTimes} = require("./acak_soal");
const { graphColoring, graphModelling } = require("./distribution");

/*
  dataRuangan = {
      jarakBaris: number,
      jarakKolom: number,
      panjangBaris: number,
      panjangKolom: number
  }  
*/
const process = (dataRuangan, listSoal) => {
  console.log("Data Ruangan");
  console.log(dataRuangan);
  console.log("===========")
  const graphColoringResult = graphColoring(
    graphModelling(
      dataRuangan.panjangBaris,
      dataRuangan.panjangKolom,
      dataRuangan.jarakBaris,
      dataRuangan.jarakKolom
    )
  );
  const hasilAcakan = acakSoal(listSoal, graphColoringResult.chromaticNumber);
  return {
    hasilGraph: graphColoringResult,
    hasilAcakan
  };
};

const processNTimes = (dataRuangan, listSoal, jumlahPercobaan) => {
    const graphColoringResult = graphColoring(
      graphModelling(
        dataRuangan.panjangBaris,
        dataRuangan.panjangKolom,
        dataRuangan.jarakBaris,
        dataRuangan.jarakKolom
      )
    );
    console.log("Berhasil membuat result " + graphColoringResult.chromaticNumber);
    const hasilAcakan = acakSoalNTimes(listSoal, graphColoringResult.chromaticNumber, jumlahPercobaan);
    return {
      hasilGraph: graphColoringResult,
      hasilAcakan,
    };
  };

module.exports = {
    process,
    processNTimes
}
