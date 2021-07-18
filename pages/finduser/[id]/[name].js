import nookies from 'nookies';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';


export default function findUserPage() {
  const router = useRouter()
  const { id, name } = router.query
  const userID = id
  if (userID) (() => {
    nookies.set(null, 'USER_ID', userID, {
      path: '/',
      maxAge: 86400 * 7
    })

    nookies.set(null, 'USER_NAME', name, {
      path: '/',
      maxAge: 86400 * 7
    })
    router.push('/')
  })()

  return (
    < div > Carregando Usuário</div >
  )
}
