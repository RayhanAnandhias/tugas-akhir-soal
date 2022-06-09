const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject('Failed to create access token :(');
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  });

  return transporter;
};

const setUpTransporter = async () => {
  const transporter = await createTransporter();
  transporter.use('compile', hbs(handlebarOptions));
  return transporter;
};

exports.sendUrlTemplateSoal = async (fileName, filePath, recipient) => {
  const transporter = await setUpTransporter();
  const address = {
    name: 'Admin Yuk Acak',
    address: process.env.EMAIL
  };
  return transporter.sendMail({
    from: address,
    to: recipient,
    subject: 'File Template Soal',
    template: 'sendAttachmentFile',
    attachments: [{ filename: fileName, path: filePath }]
  });
};

exports.sendFiles = async (fileZip, filePdf, recipient) => {
  const transporter = await setUpTransporter();
  const address = {
    name: 'Admin Yuk Acak',
    address: process.env.EMAIL
  };
  return transporter.sendMail({
    from: address,
    to: recipient,
    subject: 'Hasil Acakan Soal',
    template: 'sendAttachmentFileResult',
    attachments: [
      { path: fileZip.filePath, filename: fileZip.fileName },
      { path: filePdf.filePath, filename: filePdf.fileName }
    ]
  });
};

const handlebarOptions = {
  viewEngine: {
    extName: '.handlebars',
    partialsDir: path.join(__dirname, '/views/partials'),
    layoutsDir: path.join(__dirname, '/views/layouts'),
    defaultLayout: ''
  },
  viewPath: path.join(__dirname, '/views/template'),
  extName: '.handlebars'
};
