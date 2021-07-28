import jwt from 'jwt-simple'
import { useEffect } from 'react'
import useSWR from 'swr'

import useUser from '@/helpers/user'

import { useSiteUrl } from './urls'

const fetcher = url =>
  fetch(url, { credentials: 'include' }).then(res => res.text())

export default function useUserFetch() {
  const setUser = useUser(state => state.setUser)
  const loginUrl = useSiteUrl()

  const { data } = useSWR(loginUrl + '/user', fetcher)

  useEffect(() => {
    if (data && !/^{|}$/gm.test(data)) setUser(jwt.decode(data, 'fluffy_rest'))
  }, [data, setUser])
}
