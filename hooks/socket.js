import { useEffect } from 'react'
import io from 'socket.io-client'

import useSocket from '@/helpers/socket'

import { useSocketUrl } from './urls'

const selector = state => state.setSocket

export default function useSocketConnection() {
  const url = useSocketUrl()
  const setSocket = useSocket(selector)

  useEffect(() => {
    const socket = io(url)

    setSocket(socket)

    return () => {
      socket.disconnect()

      setSocket(null)
    }
  }, [setSocket, url])
}
