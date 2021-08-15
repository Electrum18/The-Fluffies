import { FaGoogle, FaPatreon, FaVk } from 'react-icons/fa'

import { useSiteUrl } from '@/hooks/urls'
import styles from '@/styles/elements/socials.module.css'

export default function Login({ className }) {
  const loginUrl = useSiteUrl()

  return (
    <div
      className={className ? styles.content + ' ' + className : styles.content}
    >
      <a title="Google" aria-label="Google" href={loginUrl + '/auth/google'}>
        <FaGoogle className="border-red-500 hover:text-red-500" />
      </a>

      <a
        title="VKontakte"
        aria-label="VKontakte"
        href={loginUrl + '/auth/vkontakte'}
      >
        <FaVk className="border-blue-500 hover:text-blue-500" />
      </a>

      <a title="Patreon" aria-label="Patreon" href={loginUrl + '/auth/patreon'}>
        <FaPatreon className="border-red-400 hover:text-red-400" />
      </a>
    </div>
  )
}
