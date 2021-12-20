'use strict';

const { Strategy: LocalStrategy } = require('passport-local');

const createLocalStrategy = strapi => {
  return new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      return strapi.admin.services.auth
        .checkCredentials({ email, password, authKey: req.body.authKey })
        .then(([error, user, message]) => done(error, user, message))
        .catch(error => done(error));
    }
  );
};

module.exports = createLocalStrategy;
