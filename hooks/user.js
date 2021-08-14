import jwt from 'jwt-simple'
import { useEffect } from 'react'
import useSWR from 'swr'
import useDeepCompareEffect from 'use-deep-compare-effect'
import shallow from 'zustand/shallow'

import useParameters from '@/helpers/parameters'
import useUser from '@/helpers/user'
import {
  getProfileStoredSelected,
  getProfileStoredSlot,
  validateSaves
} from '@/libs/saves'

import { useSiteUrl } from './urls'

const selector = state => [
  state.setProfileSaves,
  state.setIsProfile,
  state.setProfileSlot
]

const selectorUser = state => state.user
const selectorSetUser = state => state.setUser

const fetcher = url =>
  fetch(url, { credentials: 'include' }).then(res => res.text())

export default function useUserFetch() {
  const setUser = useUser(selectorSetUser)
  const loginUrl = useSiteUrl()

  const { data } = useSWR(loginUrl + '/user', fetcher)

  useEffect(() => {
    if (data && !/^{|}$/gm.test(data)) setUser(jwt.decode(data, 'fluffy_rest'))
  }, [data, setUser])
}

export function useUserSaves() {
  const loginUrl = useSiteUrl()

  const { data } = useSWR(loginUrl + '/user/saves', fetcher)

  try {
    return validateSaves(JSON.parse(data).saves)
  } catch {
    return []
  }
}

export function useUserSavesSetter() {
  const [setProfileSaves, setIsProfile, setProfileSlot] = useParameters(
    selector,
    shallow
  )

  const userSaves = useUserSaves()

  useEffect(() => {
    setProfileSaves(userSaves)
    setIsProfile(getProfileStoredSelected())

    const slot = getProfileStoredSlot()

    setProfileSlot(userSaves[slot] ? slot : 0)
  }, [setIsProfile, setProfileSaves, setProfileSlot, userSaves])
}

export function useValidSaveStore(saves, slot, profileSlot, profileSelected) {
  useEffect(() => {
    const timer = setTimeout(
      () => localStorage.setItem('avatars', JSON.stringify(saves)),
      1000
    )

    return () => clearTimeout(timer)
  }, [saves])

  useEffect(() => {
    localStorage.setItem('slot', slot + '')
  }, [slot])

  useEffect(() => {
    localStorage.setItem('profile_slot', profileSlot + '')
  }, [profileSlot])

  useEffect(() => {
    localStorage.setItem('profile_selected', +!!profileSelected)
  }, [profileSelected])
}

export function useProfileSavesUpdate(profileSaves) {
  const { id } = useUser(selectorUser)

  const loginUrl = useSiteUrl()

  useDeepCompareEffect(() => {
    function updateSaves(saves) {
      if (id) {
        fetch(loginUrl + '/user/saves/characters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ saves })
        })
      }
    }

    const timer = setTimeout(() => updateSaves(profileSaves), 5000)

    return () => clearTimeout(timer)
  }, [loginUrl, profileSaves])
}
