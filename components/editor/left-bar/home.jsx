import { FaSignOutAlt } from 'react-icons/fa'

import { LeftSection } from '../createSection'

function Icon({ className }) {
  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/" className="text-white">
        <FaSignOutAlt className={className} />
      </a>
    </div>
  )
}

export default function HomeSection() {
  return <LeftSection name="Home" icon={Icon} />
}
