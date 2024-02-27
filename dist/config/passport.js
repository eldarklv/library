"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("../models/User");
const verify = (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ username: username });
        if (!user) {
            return done(null, false);
        }
        // Проверка пароля
        if (user.password !== password) {
            return done(null, false);
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
});
const options = {
    usernameField: "username",
    passwordField: "password",
};
passport.use("local", new LocalStrategy(options, verify));
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
passport.deserializeUser((id, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(id);
        cb(null, user);
    }
    catch (err) {
        return cb(err);
    }
}));
