const multer = require('multer');

const fileFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype === 'application/json') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ fileFilter: fileFilter });

module.exports = upload.single('listSoal');
