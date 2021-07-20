

export default function oauth(req, res) {
  console.log('Redirecionando.....')
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_CALLBACK_URL}&user%3Aemail`)
}