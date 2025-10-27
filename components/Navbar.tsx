import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {

    const links = [
        {
            name : 'Dashboard',
            link : '/dashboard'
        },
        {
            name : 'Contact Us',
            link : '/contact'
        },
        {
            name : 'Admin',
            link : '/admin'
        }
    ]

  return (
    <div className='max-w-7xl px-6 mx-auto py-2 border border-gray-300 rounded-full shadow-md flex items-center justify-between'>
        <Link href='/'>
        <div className="flex gap-1 items-center">
            <Image src='/logo.png' width={50} height={30} alt='logo'/>
            <h2 className='text-neutral-900 text-bold text-xl'>ShopLyfter</h2>
        </div>
        </Link>
        <div className="flex items-center justify-around w-1/3">
            {links.map((el, idx) => <Link href={el.link} className='text-neutral-700 hover:text-gray-900 hover:border-b transition duration-200'>{el.name}</Link>)}
        </div>
    </div>
  )
}

export default Navbar
