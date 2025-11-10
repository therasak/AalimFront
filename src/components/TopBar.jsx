import {React, useState} from 'react'
import {NavLink, useLocation} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faBell} from '@fortawesome/free-solid-svg-icons';

function TopBar({topBarOpen}) {
  const location = useLocation()


  return (
    <div className='
    w-screen h-max 
    bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 
    flex flex-row justify-between items-center 
    px-6 py-4 shadow-md
  '>
      {/* Menu Button */}
      <h1 onClick={topBarOpen} className='cursor-pointer'>
        <FontAwesomeIcon
          icon={faBars}
          className='text-gray-200 text-xl hover:text-blue-400 transition-colors duration-300'
        />
      </h1>

      {/* Page Title */}
      <h1 className='text-white font-semibold text-lg tracking-wide'>
        {location.pathname.split('/').pop().toUpperCase() || "MENU"}
      </h1>

      {/* Notification Icon */}
      <NavLink to='home'>
        <FontAwesomeIcon
          icon={faBell}
          className='text-gray-200 text-xl hover:text-yellow-400 transition-colors duration-300'
        />
      </NavLink>
    </div>
  )

}

export default TopBar