"use strict";
module.exports = ensureAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/mod/user/login");
    }
    next();
};
