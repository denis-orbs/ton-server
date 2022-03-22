const { exec } = require("child_process");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
var path = require("path");
const { isFileExist, removeFileExtension } = require("../utils");

var router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("App running");
});

router.post("/command", function (req, res) {
  const { command } = req.body;
  const { directory } = req;

  if (!command) {
    res.send("Command missing");
  }

  try {
    exec(`cd ${directory} && ${command}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
      }
      res.send(stdout);
    });
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/command-func", function (req, res) {
  const { command: fileName } = req.body;
  const { directory } = req;

  if (!fileName) {
    return res.send("File missing");
  }

  if (!isFileExist(`./${directory}/${fileName}`)) {
    return res.send(`${fileName} missing`);
  }

  const file = removeFileExtension(fileName);

  console.log(file);
  try {
    exec(
      `~/liteclient-build/crypto/func ./${directory}/${file}.fc -o ./${directory}/${file}.fif`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
        }

        res.send(`${file}.fif created`);
      }
    );
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/commands", (req, res) => {
  const commands = ["ls", "rm"];
  res.status(200).send(commands);
});

router.post("/get-file", (req, res) => {
  const { fileName } = req.body

  const { directory } = req;
  console.log(directory);

  if (!fileName) {  
    return res.send("File missing");
  }

  if (!isFileExist(`./${directory}/${fileName}`)) {
    return res.send(`${fileName} missing`);
  }

  try {
    res.sendFile(`${fileName}`,{ root: `./${directory}` },  function (err) {
      if (err) {
          next(err);
      } else {
          console.log('Sent:', fileName);
      }
  });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.get("/cookie", (req, res) => {
  const cookie = uuidv4();
  res.status(200).send(cookie);
});

router.post("/upload", function (req, res) {
  const { directory } = req;
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  console.log(req.files);
  try {
    if (req.files.file) {
      const file = req.files.file;
      const path = `./${directory}/` + file.name;
      file.mv(path);
    } else {
      req.files.files.forEach((file) => {
        const path = `./${directory}/` + file.name;
        file.mv(path);
      });
    }

    return res.send({ status: "success" });
  } catch (error) {
    return res.status(500).send("Failed to upload files");
  }
});

module.exports = router;
