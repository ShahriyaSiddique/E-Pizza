const User = require("../../models/user");
const bcrypt = require("bcrypt");

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.register = (req, res) => {
  res.render("auth/register");
};

module.exports.postRegister = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    req.flash("error", "All fields required");
    req.flash("name", name);
    req.flash("email", email);

    return res.redirect("/register");
  }
  await User.findOne({ email }).exec((err, data) => {
    if (data) {
      req.flash("error", "Email already register");
      req.flash("name", name);
      req.flash("email", email);

      return res.redirect("/register");
    }
  });

  const hasPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hasPassword,
  });

  user.save((err, data) => {
    if (data) {
      return res.redirect("/");
    } else if (err) {
      req.flash("error", "Something went wrong");

      return res.redirect("/register");
    }
  });
};
