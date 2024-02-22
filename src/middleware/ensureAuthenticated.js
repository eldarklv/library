const ensureAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/mod/user/login");
  }
  next();
};

module.exports = ensureAuthenticated;