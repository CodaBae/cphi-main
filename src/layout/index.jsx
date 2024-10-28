import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='w-full flex justify-center flex-col overflow-x-hidden'>
        <div className='flex flex-col '>
            <Header />
        </div>
        <div className='w-full mx-auto mt-[108px]'> 
            <Outlet />
        </div>
    </div>
  )
}

export default Layout