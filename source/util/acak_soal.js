const shuffle = require("./fisher-yates.js");


// Melakukan Inisiasi Paket sebanyak jumlah N butir soal
const inisiasiPaket = (jumlahButir) => {
  const soal = [];
  for (let i = 0; i < jumlahButir; i++) {
    soal.push(i + 1);
  }
  return soal;
};

// Melakukan Shuffle Soal sebanyak jumlah paket yang diperlukan.
const shuffleSoalNTimes = (times, soal) => {
  const arrayPaketSoal = [];
  for (let i = 0; i < times; i++) {
    arrayPaketSoal.push(shuffle(soal));
  }
  console.log(arrayPaketSoal);
  return arrayPaketSoal;
};
/*

    Menghitung keunikan untuk kumpulan paket.
    A = 
    [
        [1, 2, 3, 4, 5]
        [2, 3, 4, 5, 1]
        [3, 2, 1, 4, 5]
    ]
*/
const hitungKeunikan = (listPaket) => {
  let a = 0;
  const jumlahPaket = listPaket.length;
  const n = listPaket[0].length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < jumlahPaket - 1; j++) {
      const paketJSoalI = listPaket[j][i];
      const paketJPlus1SoalI = listPaket[j + 1][i];
      if (paketJSoalI === paketJPlus1SoalI) {
        a++;
        break;
      }
    }
  }
  const keunikan = (1 - a / n) * 100;
  return keunikan;
};

/*
  Melakukan perhitungan keunikan terhadap list of kumpulan paket.
  Misal dilakukan pengacakan untuk menghasilkan 10 Paket
  Lalu dilakukan proses pengacakan untuk menghasilkan paket itu sebanyak 100 Kali
  Lalu dirata ratakan berapa persentase keunikan dari 100 kali tersebut.
  
  listPaket = [
    [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 1],
        [3, 2, 1, 4, 5],   
    ],
    [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 1],
        [3, 2, 1, 4, 5],     
    ]
  ]
*/
const hitungRataratKeunikan = (listPaket, iterasi) => {
  const listKeunikan = [];
  for (let i = 0; i < iterasi; i++) {
    listKeunikan.push(hitungKeunikan(listPaket));
  }
  let total = 0;
  for (let i = 0; i < listKeunikan.length; i++) {
    total += listKeunikan[i];
  }
  return total / listKeunikan.length;
}

