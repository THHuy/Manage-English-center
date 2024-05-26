// middleware/auth.js

module.exports = (req, res, next) => {
  if (req.session && req.session.usersname) {
    return next();
  } else {
    res.redirect("/login");
  }
};
