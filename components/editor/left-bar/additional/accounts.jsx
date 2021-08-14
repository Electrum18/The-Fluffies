import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaGoogle, FaPatreon, FaTrash, FaVk } from 'react-icons/fa'
import { mutate } from 'swr'

import ModalMini from '@/components/elements/modalMini'
import useUser from '@/helpers/user'
import { useSiteUrl } from '@/hooks/urls'
import en from '@/locales/en/pages/editor/left-bar/additional/accounts'
import ru from '@/locales/ru/pages/editor/left-bar/additional/accounts'
import styles from '@/styles/elements/accounts.module.css'

const selectorUser = state => state.user

function SocialProfile({ title, profile, auth, icon: Icon, iconStyle, t }) {
  const user = useUser(selectorUser)

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
            alt={title + t.avatar}
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
            <p className="text-primary">{t.selected}</p>
          ) : (
            <>
              <p className="text-gray-400">{t.select}</p>
              <FaTrash onClick={() => accountDelete(profile)} />
            </>
          )
        ) : (
          <p className="text-gray-400">{t.connect}</p>
        )}
      </div>
    </div>
  )
}

export default function Accounts() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <ModalMini title={t.title} page="Accounts">
      <p className={styles.text}>{t.login}</p>

      <div className={styles.content}>
        <SocialProfile
          title="Google"
          profile="google"
          auth="google"
          icon={FaGoogle}
          iconStyle="border-red-500 hover:text-red-500"
          t={t}
        />

        <SocialProfile
          title="VK"
          profile="vk"
          auth="vkontakte"
          icon={FaVk}
          iconStyle="border-blue-500 hover:text-blue-500"
          t={t}
        />

        <SocialProfile
          title="Patreon"
          profile="patreon"
          auth="patreon"
          icon={FaPatreon}
          iconStyle="border-red-400 hover:text-red-400"
          t={t}
        />
      </div>

      <p className={styles.text}>{t.p1}</p>
      <p className={styles.text}>{t.p2}</p>
    </ModalMini>
  )
}
