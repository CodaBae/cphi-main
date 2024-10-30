import React, { useState } from 'react'
import Profile from './Profile'
import About from './About'
import Booking from './Booking'
import "./Checkbox.css"

const Steps = () => {
    const [activeSteps, setActiveSteps] = useState(1)

    const handleSteps = (value) => {
        setActiveSteps(value)
    }


  return (
    <div className='flex flex-col mt-10 gap-[59px] items-center'>
        <div className='flex items-center relative'>
            <div className='bg-[#D4D4D8] w-[320px] lg:w-[837px] h-1 rounded-lg'></div>
            <div className='flex items-center gap-[50px] lg:gap-[200px] justify-between absolute -top-5 left-8 lg:left-40'>
                <div className='flex flex-col items-center  gap-1'>
                    <div className={`${activeSteps >= 1 ? "bg-[#2D84FF]" : "bg-[#fff] border border-[#C8C8D0]"} flex w-[46px] h-[46px] rounded-full justify-center items-center`}>
                        <p className={`${activeSteps >= 1 ? "text-[#fff]" : "text-[#C8C8D0]"} text-[23px] font-normal font-poppins`}>1</p>
                    </div>
                    <p className='font-sans text-[17px] text-[#C8C8D0]'>Profile</p>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <div className={`${activeSteps >= 2 ? "bg-[#2D84FF]" : "bg-[#fff] border border-[#C8C8D0]"} flex w-[46px] h-[46px] rounded-full justify-center items-center`}>
                        <p className={`${activeSteps >= 2 ? "text-[#fff]" : "text-[#C8C8D0]"} text-[23px] font-normal font-poppins`}>2</p>
                    </div>
                    <p className='font-sans text-[17px] text-[#C8C8D0]'>About</p>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <div className={`${activeSteps >= 3 ? "bg-[#2D84FF]" : "bg-[#fff] border border-[#C8C8D0]"} flex w-[46px] h-[46px] rounded-full justify-center items-center`}>
                        <p className={`${activeSteps >= 3 ? "text-[#fff]" : "text-[#C8C8D0]"} text-[23px] font-normal font-poppins`}>3</p>
                    </div>
                    <p className='font-sans text-[17px] text-[#C8C8D0]'>Booking</p>
                </div>
            </div>
        </div>

        {activeSteps === 1 && <Profile handleSteps={handleSteps} />}
        {activeSteps === 2 && <About handleSteps={handleSteps} />}
        {activeSteps === 3 && <Booking handleSteps={handleSteps} />}
    </div>
  )
}

export default Steps