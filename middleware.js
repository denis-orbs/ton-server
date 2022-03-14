const { cookieName } = require("./consts");
const { v4: uuidv4 } = require("uuid");
const { getDirectory } = require("./utils");
var fs = require("fs");

const cookieHandler = function (req, res, next) {
  let cookie = req.headers[cookieName];

  const cookies = { ...req.cookies, [cookieName]: cookie };
  req.cookies = cookies;
  next();
};

const detectRepo = function (req, res, next) {
  const directory = getDirectory(req.cookies[cookieName]);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  next();
};

module.exports = { cookieHandler, detectRepo };
