const fs = require("fs");

const getDirectory = (id) => {
  return `./${id}`;
};

const isFileExist = (file) => {
  if (fs.existsSync(file)) {
    return true;
  }
  return false;
};

const removeFileExtension = (fileName) => {
  return fileName.replace(/\.[^/.]+$/, "");
};

module.exports = { getDirectory, isFileExist, removeFileExtension };
