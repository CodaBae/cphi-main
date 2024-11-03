import React, { useEffect, useState } from 'react'

import Testing from "../../assets/png/testing.png"
import Logo from "../../assets/svg/logo_big.svg"
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../firebase-config'
import { collection, getDocs } from 'firebase/firestore'

const Landing = () => {
    const [contentData, setContentData] = useState([])

    const { id } = useParams()
    const navigate = useNavigate()
    
    console.log(id, "samba")
    const setId = () => {
        localStorage.setItem("referrerCode", id)
    }

    useEffect(() => {
      if (id) {
        setId()
      }
    }, [id])


    const getContent = async () => {
        try {
            const contentRef = collection(db, "content")
            const querySnapshot = await getDocs(contentRef);

            const data = querySnapshot.docs[0].data();

            setContentData(data)
        } catch (err) {
            console.log("Failed to fetch doc", err)
        }
    }

    useEffect(() => {
        getContent()
    }, [])


  return (
    <div className='flex w-full flex-col lg:flex-row h-screen overflow-hidden'>
        <div className='hidden lg:block lg:w-[50%] h-screen'>
            <img src={contentData?.img} alt='Testing Image' className='h-screen object-cover w-full' />
        </div>
        <div className='lg:w-6/12 w-full flex flex-col  items-center relative justify-center  px-10'>  
            <img src={Logo} alt='Logo' className=' object-contain w-full -mt-[10px]' />
            <div className='w-full flex flex-col items-center justify-center gap-[23px] lg:gap-[43px]'>
                <p className='font-sans font-medium text-center lg:w-[572px] mx-auto leading-[40px] lg:leading-[54px] text-[32px] lg:text-[52px] text-[#000000]'>
                    {contentData?.heading}
                </p>
                <p className='font-medium text-center font-sans  mx-auto  text-[#000000] text-base lg:text-[23px]'>
                    {contentData?.sub}
                </p>
                <div className='flex flex-col items-center gap-2'>
                    <button
                        className='bg-[#007DFE] rounded-lg flex items-center w-full lg:w-[444px] h-[43px] lg:h-[63px] justify-center p-1'
                        onClick={() => navigate("/services")}
                    >
                        <p className='text-[#FFFCF7] font-sen font-bold text-base lg:text-[24px]'>Get Started</p>
                    </button>
                    <p className='font-sans text-sm lg:text-[23px] text-[#000]'>All services are completely <span className='text-[#FF9000]'>free</span></p>
                </div>
            </div>
        </div>
        <div className='lg:hidden block w-full mt-5'>
            <img src={contentData?.img} alt='Testing Image' className=' object-cover w-full' />
        </div>
    </div>
  )
}

export default Landing