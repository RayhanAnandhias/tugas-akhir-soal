const multer = require('multer');

const fileFilter = (req, file, cb) => {
  console.log(file);
  if (
    file.mimetype ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    cb(null, true);
  } else {
    return cb(null, new Error('File harus bertipe dokumen dalam format .docx'));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/soal');
  },
  filename: function (req, file, cb) {
    cb(null, `${+new Date()}-FileSoal.docx`);
  }
});

const upload = multer({ fileFilter: fileFilter, storage: storage });

module.exports = upload.single('listSoal');
