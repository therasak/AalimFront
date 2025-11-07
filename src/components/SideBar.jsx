import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faHome, faUser, faUserGear,
  faRightFromBracket,faXmark 
} from '@fortawesome/free-solid-svg-icons';


import {NavLink} from 'react-router-dom';
import User from '../assets/user2.png'
function SideBar({onOff, isOpen}) {

  const navItems = [
    {
      name: 'Home',
      path: '/main/home',
      icon: faHome
    },
    {
      name: 'Profile',
      path: '/main/profile',
      icon: faUser
    },
    {
      name: 'Manage',
      path: '/main/manage',
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
        fixed top-0 left-0 h-full w-64 flex flex-col gap-5 bg-gradient-to-r from-sky-400 to-blue-500 p-3 z-30
        transform transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >

      <div className='flex flex-col justify-center w-full  mt-10 items-center'>
        <img src={User} alt="" className='w-20 h-20 text-white rounded-4xl' />
        <span className='text-2xl font-bold text-white'>Abdul Rasak</span>
        <p className='text-white'>M.c.a - Compouter Application</p>
      </div>

      <button onClick={onOff} className='top-2 right-5 absolute'><FontAwesomeIcon icon={faXmark}/></button>

      <div className='flex flex-col gap-3'>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onOff}
            className={({isActive}) =>
              `group flex items-center px-3 py-2 rounded-md text-white hover:bg-gray-100 transition-colors ${isActive ? "bg-gray-300 text-blue-500 shadow-md" : "text-blue-500"
              }`
            }
          >
            <FontAwesomeIcon
              icon={item.icon}
              className="bg-white p-1.5 rounded-sm text-blue-500 mr-3 text-sm h-4 w-4 group-hover:text-white group-hover:bg-blue-500 transition-colors"
            />
            <label className="text-md text-white font-semibold group-hover:text-blue-500 transition-colors">
              {item.name}
            </label>
          </NavLink>
        ))}

      </div>


    </div>
  )
}

export default SideBar