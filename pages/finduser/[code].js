import nookies from 'nookies';
import { useRouter } from 'next/dist/client/router';
import React from 'react';

export default function findUserPage({ token }) {
  const router = useRouter()

  React.useEffect(() => {

    if (token) {
      nookies.set(null, 'token', token, {
        path: '/'
      })
      router.push('/')
    }
  }, [token])


  return (
    < div > </div >
  )
}


export async function getServerSideProps(ctx) {

  const splitedUrl = ctx.req.url.split('/')
  const code = splitedUrl[splitedUrl.length - 1]

  const fetchToken = await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    }
  });

  const bodyFetchToken = await fetchToken.json()
  const { access_token } = bodyFetchToken


  return { props: { token: access_token ? access_token : null } }
}