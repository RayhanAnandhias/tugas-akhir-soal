const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const corsOptionDelegate = (req, callback) => {
  callback(null, {
    origin: req.header("Origin"),
    credentials: true,
  });
};

app.use(cors(corsOptionDelegate));

app.use((error, req, res, next) => {
  console.log("Ada Error ");
  const status = error.statusCode || 500;
  const message = error.message;
  const cause = error.cause || "Unknown";
  res.status(status).json({
    message: message,
    error: status,
    cause: cause,
  });
});

app.use("*" , (req, res) => {
    res.json({
     message: "error unknown path"   
    });
})

const start = async () => {
  try {
    app.listen(3000, () => {
      console.log("Listening to port 3000");
    });
  } catch (e) {
    console.log(e);
  }
};

start();
