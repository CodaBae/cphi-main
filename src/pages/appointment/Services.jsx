import React from 'react'
import { useNavigate } from 'react-router-dom'

import ImgIcon from "../../assets/png/favorite-chart.png"

const Services = () => {

    const navigate = useNavigate()

    const data = [
        {
            id: 1,
            icon: ImgIcon,
            title: "HIV Testing Services",
            description: "Comprehensive support for individuals seeking testing and linkage to care and treatment."
        },
        {
            id: 2,
            icon: ImgIcon,
            title: "Prevention",
            description: "We educate and equip individuals with tools to prevent HIV and other communicable diseases."
        },
        {
            id: 3,
            icon: ImgIcon,
            title: "Antiretroviral Therapy",
            description: "Access to effective treatment regimens for individuals living with HIV to maintain their health and quality of life."
        },
        {
            id: 4,
            icon: ImgIcon,
            title: "Orphans & Vulnerable Children",
            description: "Support services for children affected by HIV/AIDS, ensuring their access to education, healthcare, & emotional support."
        },
        {
            id: 5,
            icon: ImgIcon,
            title: "Cervical Cancer Screening",
            description: "Early detection services for cervical cancer, providing essential preventive care for women."
        },
        {
            id: 6,
            icon: ImgIcon,
            title: "Prostate Cancer Screening",
            description: "Regular screenings for prostate cancer, aimed at early detection and treatment."
        },
        {
            id: 7,
            icon: ImgIcon,
            title: "Hepatitis B Vaccination",
            description: "Vaccination programs to protect individuals from Hepatitis B, a serious liver infection."
        },
        {
            id: 8,
            icon: ImgIcon,
            title: "HPV Vaccination",
            description: "Vaccination services to prevent human papillomavirus (HPV) and reduce the risk of cervical cancer."
        },
        {
            id: 9,
            icon: ImgIcon,
            title: "Gender & Human Rights",
            description: "Comprehensive support for individuals seeking testing and linkage to care and treatment."
        },
        {
            id: 10,
            icon: ImgIcon,
            title: "Mental Health and Psychosocial Support",
            description: "Comprehensive support for individuals seeking testing and linkage to care and treatment."
        },
        {
            id: 11,
            icon: ImgIcon,
            title: "Needle and Syringe Program",
            description: "Comprehensive support for individuals seeking testing and linkage to care and treatment."
        },
        {
            id: 12,
            icon: ImgIcon,
            title: "Tuberculosis (TB) Screening",
            description: "Comprehensive support for individuals seeking testing and linkage to care and treatment."
        },
    ]

    const handleService = (value) => {
        localStorage.setItem("service", value)
    }


  return (
    <div className='w-full flex flex-col items-center justify-center gap-[93px]'>
        <p className='font-sans text-[#000000] text-[34px] lg:text-[52px] font-medium'>Our Services</p>
        <div className='grid grid-cols-2 lg:grid-cols-4 mx-auto w-12/12 gap-[26px] mb-10'>
            {
                data.map((item) => (
                    <div 
                        key={item?.id} 
                        className='border cursor-pointer border-dashed hover:shadow-xl w-[150px] h-[250px] lg:w-[251px] lg:h-[287px] p-4 lg:p-[31px] rounded-lg border-[#2D84FF] flex flex-col items-center gap-[15px]'
                        onClick={() => {navigate("/steps"), handleService(item?.title)}}
                    >
                        <img src={item?.icon} alt='icon' className='w-[40px] h-[40px]' />
                        <p className='text-sm lg:text-[20px] text-[#14183E] font-medium text-center font-ubuntu text-[#14183E]'>{item?.title}</p>
                        <p className='text-xs lg:text-[15px] font-ubuntu text-[#747582] overflow-y-auto font-normal text-center'>{item?.description}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Services