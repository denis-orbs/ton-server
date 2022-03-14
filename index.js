const express = require("express");
const command = require("./routes/command");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");

var cors = require("cors");
const { cookieHandler, detectRepo } = require("./middleware");
const router = require("./routes/command");

const app = express();
const port = 5500;

const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(
  fileupload({
    createParentPath: true,
    limits: {
      fileSize: 1024 * 1024, // 1 MB
    },
    abortOnLimit: true,
  })
);
app.use(express.static("files"));
app.use(cors(corsConfig));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cookieHandler);
app.use(detectRepo);

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
