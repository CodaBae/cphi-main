import React, { useState, Fragment, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'


const Request = ({ handleClose }) => {



  return (
    <div className='bg-[#fff] w-[668px] h-[508px] flex flex-col p-6 mt-[100px] overflow-y-scroll gap-[32px] rounded-lg'>
        <div className='flex items-center justify-between'>
            <p className='font-semibold text-[#1C1C1E] font-sans text-[18px]'>Request Reward</p>
            <AiOutlineClose className='text-[#817F9B] cursor-pointer text-[24px]' onClick={handleClose} />
        </div>

        <div className='flex flex-col gap-[32px]'>
            <div className='w-full h-[135px] flex items-center justify-center flex-col gap-2 bg-[#2D84FF17]'>
                <p className='font-sans font-medium text-[#757575] text-base'>Total Number Of Referral </p>
                <p className='font-sans text-[#1C1C1C] font-bold text-[24px]'>100</p>
            </div>

            <div className='w-full flex flex-col gap-[32px]'>
                <p className='font-mulish text-[#1C1C1E] text-[17px]'>
                    Bluetooth Wireless Earbuds: Enjoy quality sound on the go with sleek, wireless audio.
                    Smart Home Assistant Speaker: Control your home’s lighting, get news updates, 
                    or play music with ease using devices like Google Home or Amazon Echo.
                    32" HD Smart TV: Elevate your streaming experience with a new HD screen for your favorite shows and movies.
                    High-Speed USB Flash Drive (128GB): Securely store important files with ample space in a compact design.
                </p>
               
                <button
                    className='flex items-center justify-center gap-2 w-full rounded-lg h-[45px] p-2 bg-[#2D84FF]'
                    type='submit'
                    onClick={handleClose}
                >
                    <p className='text-[#fff] font-sans font-semibold text-sm'>Request Reward</p>
                </button>
            </div>
        </div>

    </div>
  )
}

export default Request