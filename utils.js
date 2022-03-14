const baseDirectory = "repo";

const getDirectory = (id) => {
  return `./${baseDirectory}/${id}`;
};

module.exports = { getDirectory };
