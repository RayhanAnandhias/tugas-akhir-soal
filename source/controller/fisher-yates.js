const {simulateNTimes, simulateOnce, acakSoal} = require("../util/acak_soal");

exports.simulateOnce = async (req, res, next) => {
    try{
        const { panjangBaris, panjangKolom, jumlahSoal } = req.body;
        const hasilSimulasi = simulateOnce(jumlahSoal, panjangBaris * panjangKolom);
        res.status(200).json({
            message: "Berhasil melakukan simulasi Fisher Yates Murni",
            data: hasilSimulasi
        });
    }catch(err) {
        next(err);
    }
}

exports.simulateNTimes = async (req, res, next) => {
    try{
        const { panjangBaris, panjangKolom, jumlahSoal, jumlahPercobaan } = req.body;
        const hasilSimulasi = simulateNTimes(jumlahSoal, panjangBaris*panjangKolom, jumlahPercobaan);
        res.status(200).json({
            message: `Berhasil melakukan simulasi Fisher Yates Murni Sebanyak ${jumlahPercobaan}`,
            data: hasilSimulasi
        });
    }catch(err) {
        next(err);
    }
}

exports.acakSoal = async (req, res, next) => {
    try{
        const { panjangBaris, panjangKolom, listSoal } = req.body;
        console.log("acak soal");
        const hasilSimulasi = acakSoal(listSoal, panjangBaris * panjangKolom);
        res.status(200).json({
            message: `Berhasil melakukan pengacakan soal murni Fisher Yates`,
            data: hasilSimulasi
        });
    }catch(err){
        next(err);
    }
}