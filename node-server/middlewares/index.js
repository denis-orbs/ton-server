const { cookieName } =  require("../consts");
const { getDirectory } =  require("../utils");
const fs =  require("fs");

const cookieHandler = function (req, res, next) {
  let cookie = req.headers[cookieName];

  const cookies = { ...req.cookies, [cookieName]: cookie };
  req.cookies = cookies;
  next();
};

const handleUserDirectory = function (req, res, next) {
  const directory = getDirectory(req.cookies[cookieName]);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  req.directory = directory;
  next();
};

module.exports = { cookieHandler, handleUserDirectory };
