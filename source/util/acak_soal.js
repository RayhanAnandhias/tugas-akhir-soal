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
const hitungKeunikan = (listPaket, isUnik) => {
  let a = 0;
  const jumlahPaket = listPaket.length;
  const n = listPaket[0].length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < jumlahPaket - 1; j++) {
      const paketJSoalI = listPaket[j][i];
      const paketJPlus1SoalI = listPaket[j + 1][i];
      if (isUnik(paketJSoalI, paketJPlus1SoalI)) {
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
const hitungRatarataKeunikan = (listPaket, isUnik) => {
  const listKeunikan = [];
  const iterasi = listPaket.length;
  for (let i = 0; i < iterasi; i++) {
    listKeunikan.push(hitungKeunikan(listPaket[i], isUnik));
  }
  let total = 0;
  for (let i = 0; i < listKeunikan.length; i++) {
    total += listKeunikan[i];
  }
  return {
    totalKeunikan : total / listKeunikan.length,
    listKeunikan
  }
}

const createListOfListPaket = (soalList, paketLength, listLength) => {
  const listOfPaket = [];
  for (let i = 0; i < listLength; i++) {
    listOfPaket.push(shuffleSoalNTimes(paketLength, soalList));
  }
  return listOfPaket;
}


const simulateOnce = (panjangSoal, jumlahPaket) => {
  const paketAsli = inisiasiPaket(panjangSoal);
  const listOfPaket = shuffleSoalNTimes(jumlahPaket, paketAsli);
  const nilaiKeunikan = hitungKeunikan(listOfPaket, (soal1, soal2) => soal1 == soal2);
  return {
    nilaiKeunikan,
    hasilAcak: listOfPaket
    
  }
}

const simulateNTimes = (panjangSoal, jumlahPaket, jumlahPercobaan) => {
  const paketAsli = inisiasiPaket(panjangSoal);
  const listOfListPaket = createListOfListPaket(paketAsli, jumlahPaket, jumlahPercobaan);
  const dataKeunikan = hitungRatarataKeunikan(listOfListPaket, (soal1, soal2) => soal1 == soal2);
  return {
    dataKeunikan
  };
}

const acakSoal = (listSoal, jumlahPaket) => {
  const listPaket = shuffleSoalNTimes(jumlahPaket, listSoal);
  // for (let i = 0; i < jumlahPaket; i++) {
  //   listPaket.push(shuffle(listSoal));
  // }
  const persentaseKeunikan = hitungKeunikan(listPaket, (soal1, soal2) => soal1.id == soal2.id);
  const listPaketNomor = [];
  listPaket.forEach(paket => {
    const listNomor = [];
    paket.forEach( soal => {
      listNomor.push(soal.id)
    })
    listPaketNomor.push(listNomor);
  })
  return {
    persentaseKeunikan,
    listPaketNomor,
    listPaket
  }
}

const acakSoalNTimes = (listSoal, jumlahPaket, jumlahPercobaan) => {
  const listOfListPaket = createListOfListPaket(listSoal, jumlahPaket, jumlahPercobaan);
  const persentaseKeunikan = hitungRatarataKeunikan(listOfListPaket, (soal1, soal2) => soal1.id == soal2.id); 
  return {
    dataKeunikan: persentaseKeunikan
  };
}

module.exports = {
  simulateOnce,
  simulateNTimes,
  acakSoal,
  acakSoalNTimes
}
