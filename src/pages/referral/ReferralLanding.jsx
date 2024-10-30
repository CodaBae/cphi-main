import React from 'react'

import Testing from "../../assets/png/testing.png"
import Logo from "../../assets/svg/logo_big.svg"
import { useNavigate } from 'react-router-dom'

const ReferralLanding = () => {

    const navigate = useNavigate()

  return (
    <div className='flex w-full h-screen overflow-hidden'>
        <div className='w-[50%] hidden lg:block h-screen'>
            <img src={Testing} alt='Testing' className='h-screen object-cover w-full' />
        </div>
        <div className='w-full lg:w-6/12 flex flex-col items-center relative justify-center  px-10'>  
            <img src={Logo} alt='Logo' className=' object-contain w-full -mt-[10px]' />
            <div className='w-full flex flex-col items-center justify-center gap-[43px]'>
                <p className='font-sans font-medium text-center lg:w-[572px] mx-auto leading-[40px]  lg:leading-[54px] text-[32px] lg:text-[52px] text-[#000000]'>
                    Everyone is safer, If we are all tested
                </p>
                <p className='font-medium text-center font-sans  mx-auto  text-[#000000] text-base lg:text-[23px]'>
                    Help protect your loved ones. 
                    Refer a friend and ensure we all stay safe because everyone is safer when we're all tested.
                </p>
                <div className='flex flex-col items-center gap-2'>
                    <button
                        className='bg-[#007DFE] rounded-lg flex items-center w-full lg:w-[444px] h-[43px] lg:h-[63px] justify-center p-1'
                        onClick={() => navigate("/referral/register")}
                    >
                        <p className='text-[#FFFCF7] font-sen font-bold text-base lg:text-[24px]'>Refer a Friend</p>
                    </button>
                    <p className='font-sans text-sm lg:text-[23px] text-[#000]'>All services are completely <span className='text-[#FF9000]'>free</span></p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ReferralLanding