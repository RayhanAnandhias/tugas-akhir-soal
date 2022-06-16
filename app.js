const express = require('express');
const cors = require('cors');
const router = require('./source/route/index');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptionDelegate = (req, callback) => {
  callback(null, {
    origin: req.header('Origin'),
    credentials: true
  });
};

app.use(cors(corsOptionDelegate));

app.use('/soal', express.static(path.join(__dirname, 'public', 'soal')));

app.use('/fisher-yates', router.fisherYates);
app.use('/main-process', router.mainProcess);
app.use('/optimasi-ruangan', router.optimasiRuangan);
app.use('/generate-template', router.soal);

app.use((error, req, res, next) => {
  console.log('Ada Error ');
  const status = error.statusCode || 500;
  const message = error.message;
  const cause = error.cause || 'Unknown';
  res.status(status).json({
    message: message,
    error: status,
    cause: cause
  });
});

app.use('*', (req, res) => {
  res.json({
    message: 'error unknown path'
  });
});

const start = async () => {
  try {
    app.listen(3000, () => {
      console.log(
        `Listening to http://${process.env.TA_HOST}`
      );
    });
  } catch (e) {
    console.log(e);
  }
};

start();
