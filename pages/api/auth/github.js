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
//'response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback&scope=user%3Aemail&client_id=29e0b92c754a43b53246'
const authGithub = nextConnect()
  .use(passport.initialize())
  .use(passport.session())
  .use(passport.authenticate('github', { scope: ['user:email'], failureRedirect: '/login' }))


export default authGithub;
