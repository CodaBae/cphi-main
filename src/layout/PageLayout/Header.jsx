import React from 'react'
import Logo from "../../assets/svg/logo_small.svg"
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className='w-full fixed z-50 bg-[#fff]'>
        <img src={Logo} alt="Logo" className='w-[276px] cursor-pointer h-[82px]' onClick={() => navigate("/referral")} />
    </div>
  )
}

export default Header