import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faHome, faUser, faUserGear,
  faRightFromBracket, faXmark
} from '@fortawesome/free-solid-svg-icons';


import {NavLink} from 'react-router-dom';
import User from '../assets/user2.png'
function SideBar({onOff, isOpen}) {

  const navItems = [
    {
      name: 'Dashboard',
      path: '/main/home',
      icon: faHome
    },
    {
      name: 'Customers',
      path: '/main/customerList',
      icon: faUser
    },
    {
      name: 'Settings',
      path: '/main/settings',
      icon: faUserGear
    },
    {
      name: 'Logout',
      path: '/',
      icon: faRightFromBracket
    },
  ]

  return (
    <div
      className={`
      fixed top-0 left-0 h-full w-64 flex flex-col gap-5 
      bg-gradient-to-b from-gray-900 via-blue-900 to-gray-800 
      p-4 z-30
      transform transition-transform duration-500 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}
    >
      {/* Profile Section */}
      <div className='flex flex-col justify-center items-center mt-10'>
        <img src={User} alt="User" className='w-20 h-20 rounded-full border-2 border-blue-400 shadow-lg' />
        <span className='text-xl font-semibold text-white mt-2 tracking-wide'>
          Abdul Rasak
        </span>
        {/* <p className='text-gray-300 text-sm'>M.C.A - Computer Application</p> */}
      </div>

      {/* Close Button */}
      <button
        onClick={onOff}
        className='absolute top-3 right-4 text-gray-300 hover:text-white transition-colors'
      >
        <FontAwesomeIcon icon={faXmark} size="lg" />
      </button>

      {/* Navigation Links */}
      <div className='flex flex-col gap-2 mt-5'>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onOff}
            className={({isActive}) =>
              `
            group flex items-center px-4 py-2.5 rounded-md font-medium
            transition-all duration-300
            ${isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-300 hover:bg-blue-700 hover:text-white'}
            `
            }
          >
            <FontAwesomeIcon
              icon={item.icon}
              className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform"
            />
            <span className="text-sm tracking-wide">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )

}

export default SideBar