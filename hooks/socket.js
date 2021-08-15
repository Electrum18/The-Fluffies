import { useEffect } from 'react'
import io from 'socket.io-client'

import useSocket from '@/helpers/socket'

const selector = state => state.setSocket

export default function useSocketConnection() {
  const setSocket = useSocket(selector)

  useEffect(() => {
    const { host, hostname } = window.location

    const socket = io(hostname === 'localhost' ? hostname + ':3001' : host)

    setSocket(socket)

    return () => {
      socket.disconnect()

      setSocket(null)
    }
  }, [setSocket])
}
