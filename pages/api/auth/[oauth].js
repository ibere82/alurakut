import passport from "passport";
import nextConnect from "next-connect";
import { Strategy as GitHubStrategy } from 'passport-github2';
import session from 'express-session'

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},

  function (accessToken, refreshToken, profile, done) {
    console.log(profile)
    return done(null, profile)
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

const authGithub = nextConnect()
  .use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: { secure: true } }))
  .use(passport.initialize())
  .use(passport.session(sess))
  .use(passport.authenticate('github', { scope: ['user:email'], failureRedirect: '/login' }))
  .use('api/auth/callback', function (req, res) {
    //console.log(req.user)
    res.redirect('/finduser/' + req.user.id + '/' + req.user.username);
  })


export default authGithub;
