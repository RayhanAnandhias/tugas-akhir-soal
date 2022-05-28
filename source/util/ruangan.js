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

  const minPasangan = pasangan.reduce((prev, cur) =>
    prev.total < cur.total ? prev : cur
  ).total;

  const finalLayout = pasangan.filter((p) => p.total === minPasangan);

  console.table(pasangan);

  console.table(finalLayout);

  return finalLayout;
};

module.exports = { hitungTotal };
