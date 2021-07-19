import passport from "passport";
import nextConnect from "next-connect";
import { Strategy as GitHubStrategy } from 'passport-github2';
import session from 'express-session'
import cookie from 'cookie'

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

  console.log('uoduiiousdaoi')
  done(null, user.id);
});
const authGithub = nextConnect()
  .use(passport.initialize())
  .use(passport.session())
  .use(passport.authenticate('github', { scope: ['user:email'], failureRedirect: '/login' }))


export default authGithub;
