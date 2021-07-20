import cookie from 'cookie'

export default async function callback(req, res) {
  const { code } = req.query

  try {
    const fetchToken = await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      }
    })
    const bodyFetchToken = await fetchToken.json()
    const { access_token } = bodyFetchToken

    res.setHeader("Set-Cookie", cookie.serialize("token", access_token, {
      httpOnly: true,
      secure: true,//process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    }))
    res.redirect('/')




  } catch (error) {
    const message = `Deu erro na função callback: ${error.message} /// fim da mensagem de erro.
    Tentativa de fetch com ID ${process.env.GITHUB_CLIENT_ID}  e code ${code}`
    res.send(message)
  }

  // const fetchUser = await fetch('https://api.github.com/user', {
  //   headers: {
  //     'Authorization': `token ${access_token}`
  //   }
  // })

  // const user = await fetchUser.json()
  // console.log(JSON.stringify(user))

  return
}

