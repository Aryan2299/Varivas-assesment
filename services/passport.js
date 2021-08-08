const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("profile: ", profile);
      console.log("accessToken: ", accessToken);

      User.findOne({ userId: profile.id }).then((existingUser) => {
        if (!existingUser) {
          new User({
            userId: profile.id,
            name: profile.displayName,
            photo: profile.photos[0].value,
          })
            .save()
            .then((user) => {
              done(null, user);
            });
        } else {
          done(null, existingUser);
        }
      });
    }
  )
);
