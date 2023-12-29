const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("../models/User");

const verify = async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return done(null, false);
    }

    // Проверка пароля
    if (user.password !== password) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const options = {
  usernameField: "username",
  passwordField: "password",
};

passport.use("local", new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findById(id);
    cb(null, user);
  } catch (err) {
    return cb(err);
  }
});