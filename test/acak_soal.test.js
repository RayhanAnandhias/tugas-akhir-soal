const assert = require("assert");
const acakSoal = require("../source/util/acak_soal");

const sumberSoal = [
  {
    idPernyataan: 0,
    pernyataan: "",
    soal: [
      {
        id: "3",
        question:
          "Cara yang tepat untuk menyajikan informasi yang berupa data adalah….",
        option: [
          "Kata atau kalimat",
          "Table atau grafik",
          "Tulisan atau slogan",
          "Lagu atau gerak",
          "Gambar atau wacana",
        ],
        answer: 1,
      },
    ],
  },
  {
    idPernyataan: "2",
    pernyataan:
      "Semburan Baru Muncul di Mindi    Semburan lumpur, air, dan gas baru keluar dari halaman belakang rumah salah seorang penduduk warga Desa Mendi, Kecamatan Porong, Kabupaten Sidoarjo. Semburan ini merupakan semburan ke-59 yang muncul di sekitaran pusat semburan utama.    Menurut seorang ahli dari Leader Team Frgaco, perusahaan yang mengawasi gas-gas berbahaya disekitar pusat semburan, semburan sama dengan 58 semburan liar sebelumnya. Semburan liar itu juga tidak berbahaya dan akan membesar.    Kalau dibiarkan semburan itu akan mengecil sendiri. Untuk menutup semburan, hari ini akan dimasukkan 100 kilogram semen ke dalam lubang asal semburan.",
    soal: [
      {
        id: "5",
        question: "Fakta dalam teks tersebutkan yang tepat adalah ….",
        option: [
          "Semburan lumpur baru merupakan semburan ke-59",
          "Semburan liar itu tidak berbahaya seperti semburan semburan yang lainnya.",
          "Semburan liar itu sama dengan semburan sebelumnya.",
          "Semburan liar itu akan mengecil dengan sedirinya.",
          "Untuk menutup menutup semua semburan liar itu, diperlukan 100 kilogram semen.",
        ],
        answer: 0,
      },
      {
        id: "4",
        question:
          "Ide pokok paragraph kedua teks tersebut yang tepat adalah ….",
        option: [
          "Pengawasan gas oleh tim ahli",
          "Pendapat tentang semburan liar",
          "Munculnya semburan liar",
          "Mengecilnya semburan liar",
          "penutupan lubang semburan",
        ],
        answer: 1,
      },
    ],
  },
  {
    idPernyataan: "1",
    pernyataan:
      "(2) Untuk menentukan sebuah bacaan bermanfaat atau tidak,bergantung pada opini yang sifatnya subjectif.(1)Masing masing individu memiliki kemampuan dan selera berbeda beda mengenai hal hal yang dianggap menarik untuk dibaca.(4)Tetapi,secara umum dapat dikatakan manfaat membaca sangat besa.Manfaat tersebut telihat jelas dalam pembentukan kepribadian seseorang. (3)Selain itu,membaca juga dapat memperkaya informasi dalam pemikiran kita.",
    soal: [
      {
        id: "2",
        question:
          "Kesimpulan yang merupakan paragraf deduktif ditunjukan dengan no..",
        option: ["(1)", "(2)", "(3)", "(4)", "(5)"],
        answer: 2,
      },
      {
        id: "1",
        question:
          "Kesimpulan yang merupakan paragraf induktif ditunjukan dengan no…",
        option: ["(1)", "(2)", "(3)", "(4)", "(5)"],
        answer: 1,
      },
    ],
  },
];

const testCaseMDL3_1 = () => {
  it("MDL3 - 1", () => {
        const paketDiperlukan = 0;
        const soal = [];
        const result = acakSoal.shuffleSoalNTimes(paketDiperlukan, soal);
        assert.equal(result.length , 0);
  });
};

const testCaseMDL3_2 = () => {
  it("MDL3 - 2", () => {
    const paketDiperlukan = 2;
    const soal = [];
    const result = acakSoal.shuffleSoalNTimes(paketDiperlukan, soal);
    assert.equal(result.length, paketDiperlukan);
    result.forEach((value) => {
        assert.equal(value.length, 0);
    })
  });
};

const testCaseMDL3_3 = () => {
  it("MDL3 - 3", () => {
    const paketDiperlukan = 2;
    const soal = sumberSoal;
    const result = acakSoal.shuffleSoalNTimes(paketDiperlukan, soal);
    assert.equal(result.length, paketDiperlukan);
    assert.equal(result[0].length, soal.length);
    assert.equal(result[1].length, soal.length);
  });
};

describe("Pengacakan Soal Module", () => {
  testCaseMDL3_1();
  testCaseMDL3_2();
  testCaseMDL3_3();
});
