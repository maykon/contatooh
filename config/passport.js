var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

module.exports = function() {
  var Usuario = mongoose.model('Usuario');

  passport.use(new GitHubStrategy({
    clientID: '051b32e9ae3544461fd8',
    clientSecret: '74f7f39b2312f4e39cc2c0022c4bad3e8dc62c85',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  }, function(accessToken, refreshToken, profile, done) {
    Usuario.findOrCreate({
        "login": profile.username
      }, {
        "nome": profile.username
      },
      function(erro, usuario) {
        if (erro) {
          console.log(erro);
          return done(erro);
        }
        return done(null, usuario);
      }
    );
  }));

  passport.serializeUser(function(usuario, done) {
    done(null, usuario._id);
  });

  passport.deserializeUser(function(id, done) {
    Usuario.findById(id).exec()
      .then(function(usuario) {
        done(null, usuario);
      });
  });
};
