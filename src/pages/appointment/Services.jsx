import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ImgIcon from "../../assets/png/favorite-chart.png"
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase-config'

const Services = () => {
    const [servicesData, setServicesData] = useState([])
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleService = (value) => {
        localStorage.setItem("service", value)
    }

    const getServices = async () => {
        try {
            const servicesRef = collection(db, "services")
            const querySnapshot = await getDocs(servicesRef);

            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setServicesData(data)
        } catch (err) {
            console.log("Failed to fetch doc", err)
        }
    }

    useEffect(() => {
        getServices()
    }, [])

      // Function to handle hover effect
    //   const handleMouseEnter = (e) => {
    //     const card = e.currentTarget;
    //     card.querySelector('.title').style.display = 'none';
    //     card.querySelector('.description').style.display = 'block';
    // };

    // const handleMouseLeave = (e) => {
    //     const card = e.currentTarget;
    //     card.querySelector('.title').style.display = 'block';
    //     card.querySelector('.description').style.display = 'none';
    // };

    console.log(servicesData, "servicesData")

  return (
    // <div className='w-full flex flex-col items-center justify-center gap-[93px]'>
    //     <p className='font-sans text-[#000000] text-[34px] lg:text-[52px] font-medium'>Our Services</p>
    //     <div className='flex items-center lg:grid lg:grid-cols-4 overflow-x-auto w-full mb-10 flex-nowrap px-4 lg:mx-auto gap-4 lg:overflow-x-hidden '>
    //         {
    //             servicesData?.map((item) => (
    //                 <div 
    //                     key={item?.id} 
    //                     className={`bg-[${item?.color}] border cursor-pointer border-dashed hover:shadow-xl mx-auto min-w-[250px] sm:min-w-[300px] lg:w-[251px] h-[250px] lg:h-[287px] p-4 lg:p-[31px] rounded-lg border-[#2D84FF] flex flex-col items-center gap-[15px] mr-4`}
    //                     onClick={() => {navigate("/steps"); handleService(item?.title)}}
    //                 >
    //                     <p className='text-sm lg:text-[20px] text-[#14183E] font-medium text-center font-ubuntu'>{item?.title}</p>
    //                     <p className='text-xs lg:text-[15px] font-ubuntu text-[#747582] overflow-y-auto font-normal text-center'>{item?.description}</p>
    //                 </div>
    //             ))
    //         }
    //     </div>
    // </div>
    <div className='w-full flex flex-col items-center justify-center gap-[50px] px-4'>
        <p className='font-sans text-[#000000] text-[34px] lg:text-[52px] font-medium'>Our Services</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full mb-5'>
            {servicesData?.map((item) => (
                <div 
                    key={item?.id}
                    style={{ backgroundColor: item?.color }}
                    className='cursor-pointer hover:shadow-xl p-4 lg:p-[31px] rounded-lg  flex items-center justify-center h-[250px] lg:h-[250px] transition-all duration-300 relative'
                    onClick={() => { navigate("/steps"); handleService(item?.title); }}
                >
                    <div 
                        className='flex flex-col items-center justify-center h-full w-full relative'
                        onMouseEnter={!isMobile ? (e) => {
                            const title = e.currentTarget.querySelector('.title');
                            const description = e.currentTarget.querySelector('.description');
                            title.style.opacity = '0';
                            description.style.opacity = '1';
                        } : null}
                        onMouseLeave={!isMobile ? (e) => {
                            const title = e.currentTarget.querySelector('.title');
                            const description = e.currentTarget.querySelector('.description');
                            title.style.opacity = '1';
                            description.style.opacity = '0';
                        } : null}
                    >
                        <p className={`title lg:hover:hidden lg:inset-y-20 lg:inset-y-20 lg:absolute text-sm lg:text-[25px] lg:leading-[30px] text-[#fff] font-medium text-center font-ubuntu transition-opacity duration-300 ${isMobile ? '' : 'opacity-100'}`}>
                            {item?.title}
                        </p>
                        <p className={`description lg:hover:block lg:hover:absolute lg:hover:inset-y-20 lg:hover:inset-y-20  text-xs lg:text-[15px] font-ubuntu text-[#fff] font-normal text-center transition-opacity duration-300 ${isMobile ? '' : 'opacity-0'}`}>
                            {item?.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>







  )
}

export default Services