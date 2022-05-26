const cekSisaMeja = (sisa, sisiMeja) => {
  return sisa > sisiMeja ? 1 : 0;
};

const hitungMeja = (sisiRuangan, sisiMeja, jarakAntarMeja) => {
  const meja = Math.floor(sisiRuangan / (sisiMeja + jarakAntarMeja));
  const sisaMeja = cekSisaMeja(
    sisiRuangan % (sisiMeja + jarakAntarMeja),
    sisiMeja,
    jarakAntarMeja
  );
  return meja + sisaMeja;
};

const producePasangan = (
  vertical,
  horizontal,
  jumlahHorizontal,
  jumlahVertical,
  total,
  ratio
) => {
  return {
    jb: vertical,
    jk: horizontal,
    horizontal: jumlahHorizontal,
    jumlahVertical: jumlahVertical,
    total,
    ratio
  };
};

const hitungTotal = (
  horizontalMeja,
  verticalMeja,
  horizontalRuangan,
  verticalRuangan,
  jumlahPeserta
) => {
  const listOfBatas = [220, 110, 73.3, 55];
  const pasangan = [];
  for (let horizontal of listOfBatas) {
    for (let vertical of listOfBatas) {
      const jumlahHorizontal = hitungMeja(
        horizontalRuangan,
        horizontalMeja,
        horizontal
      );
      const jumlahVertical = hitungMeja(
        verticalRuangan,
        verticalMeja,
        vertical
      );
      const total = jumlahHorizontal * jumlahVertical;
      const shouldPush = total > jumlahPeserta;
      const ratio = total / jumlahPeserta;
      if (shouldPush) {
        pasangan.push(
          producePasangan(
            vertical,
            horizontal,
            jumlahHorizontal,
            jumlahVertical,
            total,
            ratio
          )
        );
      }
    }
  }
  console.table(pasangan);
  return pasangan;
};

// hitungTotal(60, 50, 500, 1000, 10);

module.exports = { hitungTotal };

/* 
1. Nerima Input
1.5 User memilih Layout Ingin digunakan (Bila ada beberapa pilihan)
2. Munculin Graf , Soal teracak dalam bentuk file
 [] [] [] []
 [] [] [] []


 Merah = Paket Soal 1
{

}
*/
