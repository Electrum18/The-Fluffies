import create from 'zustand'

const useSocket = create(set => ({
  socket: undefined,

  setSocket: socket => set({ socket })
}))

export default useSocket
