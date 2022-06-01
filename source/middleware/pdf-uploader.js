const multer = require('multer');

const fileFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    return cb(null, new Error('File harus bertipe dokumen dalam format .pdf'));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/soal');
  },
  filename: function (req, file, cb) {
    const name = req.body.email || 'anonym';
    cb(null, `${+new Date()}-dashboard-${name}.pdf`);
  }
});

const upload = multer({ fileFilter: fileFilter, storage: storage });

module.exports = upload.single('dashboardPdf');
