import Image from 'next/image'
import { FaGoogle, FaPatreon, FaTrash, FaVk } from 'react-icons/fa'
import { mutate } from 'swr'

import ModalMini from '@/components/elements/modalMini'
import useUser from '@/helpers/user'
import { useSiteUrl } from '@/hooks/urls'
import styles from '@/styles/elements/accounts.module.css'

function SocialProfile({ title, profile, auth, icon: Icon, iconStyle }) {
  const user = useUser(state => state.user)

  const loginUrl = useSiteUrl()

  const profileAvatar = user.avatars[profile]

  function accountSelect(current) {
    fetch(loginUrl + '/user/change/current', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ current })
    }).then(res => res.ok && mutate(loginUrl + '/user'))
  }

  function accountDelete(account) {
    fetch(loginUrl + '/user/unlink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ account })
    }).then(res => res.ok && mutate(loginUrl + '/user'))
  }

  return (
    <div className={styles.socialProfile}>
      <p>{title}</p>

      {profileAvatar ? (
        <div
          className={
            user.current === profile
              ? styles.avatarSelected
              : styles.avatarHovered
          }
        >
          <Image
            loader={({ src }) => src}
            src={profileAvatar}
            alt={title + ' avatar'}
            width="64"
            height="64"
            onClick={() => accountSelect(profile)}
          />
        </div>
      ) : (
        <a title={title} aria-label={title} href={loginUrl + '/auth/' + auth}>
          <Icon className={iconStyle} />
        </a>
      )}

      <div>
        {profileAvatar ? (
          user.current === profile ? (
            <p className="text-primary"> selected </p>
          ) : (
            <>
              <p className="text-gray-400"> select </p>
              <FaTrash onClick={() => accountDelete(profile)} />
            </>
          )
        ) : (
          <p className="text-gray-400"> connect </p>
        )}
      </div>
    </div>
  )
}

export default function Accounts() {
  return (
    <ModalMini title="Profile accounts" page="Accounts">
      <p className={styles.text}>Login to profile with</p>

      <div className={styles.content}>
        <SocialProfile
          title="Google"
          profile="google"
          auth="google"
          icon={FaGoogle}
          iconStyle="border-red-500 hover:text-red-500"
        />

        <SocialProfile
          title="VK"
          profile="vk"
          auth="vkontakte"
          icon={FaVk}
          iconStyle="border-blue-500 hover:text-blue-500"
        />

        <SocialProfile
          title="Patreon"
          profile="patreon"
          auth="patreon"
          icon={FaPatreon}
          iconStyle="border-red-400 hover:text-red-400"
        />
      </div>

      <p className={styles.text}>
        If you delete all accounts in a profile, and do not link at least one
        during the day, then this profile will be deleted
      </p>

      <p className={styles.text}>
        This action cannot be canceled if a day has passed after unlinking all
        accounts!
      </p>
    </ModalMini>
  )
}
