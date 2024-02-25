import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport"
import User from "../models/User";
import { IUser } from "../interfaces/IUser";

type DoneFunction = (error: any, user: IUser | false, options?: { message: string }) => void

const verify = async (username: string, password: string, done: DoneFunction) => {
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
    return done(err, false);
  }
};

const options = {
  usernameField: "username",
  passwordField: "password"
};

passport.use("local", new LocalStrategy(options, verify));

passport.serializeUser((user: any, done: DoneFunction) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    return done(err);
  }
});