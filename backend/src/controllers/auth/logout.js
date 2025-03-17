module.exports = (req, res) => {
  res.clearCookie("refreshToken");
  res.end();
};
