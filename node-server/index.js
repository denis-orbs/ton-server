const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const cors = require("cors");
const { cookieHandler, handleUserDirectory } = require("./middlewares");
const router = require("./router");

const app = express();
const port = process.env.PORT || 5500;

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
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cookieHandler);
app.use(handleUserDirectory);
app.use("/", router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
