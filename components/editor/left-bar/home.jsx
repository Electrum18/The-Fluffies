import Link from 'next/link'
import { FaSignOutAlt } from 'react-icons/fa'

import { LeftSection } from '../createSection'

function Icon({ className }) {
  return (
    <div>
      <Link href="/">
        <a className="text-white">
          <FaSignOutAlt className={className} />
        </a>
      </Link>
    </div>
  )
}

export default function HomeSection() {
  return <LeftSection name="Home" icon={Icon} />
}
