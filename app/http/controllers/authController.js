module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.register = (req, res) => {
  res.render("auth/register");
};
