import passport from "passport";
import nextConnect from "next-connect";
import { Strategy as GitHubStrategy } from 'passport-github2';

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},

  function (accessToken, refreshToken, profile, done) {
    return done(null, profile)
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

const authGithub = nextConnect()
  .use(passport.initialize())
  .use(passport.session())
  .use(passport.authenticate('github', { scope: ['user:email'], failureRedirect: '/login' }))
  .use('api/auth/callback', function (req, res) {
    res.redirect('/finduser/' + req.user.id + '/' + req.user.username);
  })


export default authGithub;
