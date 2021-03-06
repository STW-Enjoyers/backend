const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
var User = require('../app_api/models/userSchema')

passport.use(
  new localStrategy({ usernameField: "email" }, (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) return done(err);
      else if (!user)
        return done(null, false, { message: "Email sin registrar :C" });
      else if (!user.verifyPassword(password))
        return done(null, false, { message: "Contraseña incorrecta :C" });
      else return done(null, user);
    });
  })
);