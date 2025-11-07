import {React,useState} from 'react'
import {NavLink, useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';

function TopBar({topBarOpen}) {
  const location=useLocation()
  

  return (
    <div className='w-screen h-max bg-gradient-to-r from-indigo-500 to-blue-500 flex flex-row justify-between items-center p-5'>
      <h1 onClick={topBarOpen}>  <FontAwesomeIcon icon={faBars} className='text-xl' /></h1>
      <h1>{location.pathname.split('/').pop().toUpperCase() || "MENU"}</h1>
      <h1><NavLink to='home'  ><FontAwesomeIcon icon={faBell} className='text-xl hover:text-yellow-300 transition-colors duration-200' /></NavLink>
      </h1>
    </div>
  )
}

export default TopBar