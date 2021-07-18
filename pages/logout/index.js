import nookies from 'nookies';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

export default function logout() {
  const router = useRouter()

  useEffect(() => {
    nookies.destroy(null, 'USER_ID')
    nookies.destroy(null, 'USER_NAME')
    router.push('/login')

  }, [])

  return (
    < div > Fazendo Logout</div >
  )
}