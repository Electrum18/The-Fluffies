import React, { useState } from 'react'

export default function Contributors() {
  const [contributors] = useState([
    'Jankie',
    'FreddyDan12',
    'Redy',
    'Train Drive',
    'EAlex',
    'SweetMouse',
    'Archius',
    'The_Milkyz',
  ])

  return (
    <ul className='flex w-full p-4 overflow-x-scroll overflow-y-hidden bg-gray-200 shadow-inner flex-nowrap md:justify-around md:overflow-x-hidden'>
      {contributors.map((name) => (
        <li
          key={name}
          className='mx-2 text-lg font-medium text-gray-500 whitespace-nowrap'
        >
          {name}
        </li>
      ))}
    </ul>
  )
}
