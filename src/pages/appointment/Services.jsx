import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import ImgIcon from "../../assets/png/favorite-chart.png";

const Services = () => {
    const [servicesData, setServicesData] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [hoveredCardId, setHoveredCardId] = useState(null);
    const [search, setSearch] = useState("")

    const navigate = useNavigate();

    // const data = [
    //     {
    //         id: 1,
    //         icon: ImgIcon,
    //         title: "HIV Testing Services",
    //         description: "Comprehensive support for individuals seeking testing and linkage to care and treatment."
    //     },
    //     {
    //         id: 2,
    //         icon: ImgIcon,
    //         title: "Prevention",
    //         description: "We educate and equip individuals with tools to prevent HIV and other communicable diseases."
    //     },
    //     {
    //         id: 3,
    //         icon: ImgIcon,
    //         title: "Antiretroviral Therapy",
    //         description: "Access to effective treatment regimens for individuals living with HIV to maintain their health and quality of life."
    //     },
    //     {
    //         id: 4,
    //         icon: ImgIcon,
    //         title: "Orphans & Vulnerable Children",
    //         description: "Support services for children affected by HIV/AIDS, ensuring their access to education, healthcare, & emotional support."
    //     },
    //     {
    //         id: 5,
    //         icon: ImgIcon,
    //         title: "Cervical Cancer Screening",
    //         description: "Early detection services for cervical cancer, providing essential preventive care for women."
    //     },
    //     {
    //         id: 6,
    //         icon: ImgIcon,
    //         title: "Prostate Cancer Screening",
    //         description: "Regular screenings for prostate cancer, aimed at early detection and treatment."
    //     },
    //     {
    //         id: 7,
    //         icon: ImgIcon,
    //         title: "Hepatitis B Vaccination",
    //         description: "Vaccination programs to protect individuals from Hepatitis B, a serious liver infection."
    //     },
    //     {
    //         id: 8,
    //         icon: ImgIcon,
    //         title: "HPV Vaccination",
    //         description: "Vaccination services to prevent human papillomavirus (HPV) and reduce the risk of cervical cancer."
    //     },
    //     {
    //         id: 9,
    //         icon: ImgIcon,
    //         title: "Gender & Human Rights",
    //         description: "Comprehensive support for individuals seeking testing and linkage to care and treatment."
    //     },
    //     {
    //         id: 10,
    //         icon: ImgIcon,
    //         title: "Mental Health and Psychosocial Support",
    //         description: "Comprehensive support for individuals seeking testing and linkage to care and treatment."
    //     },
    //     {
    //         id: 11,
    //         icon: ImgIcon,
    //         title: "Needle and Syringe Program",
    //         description: "Comprehensive support for individuals seeking testing and linkage to care and treatment."
    //     },
    //     {
    //         id: 12,
    //         icon: ImgIcon,
    //         title: "Tuberculosis (TB) Screening",
    //         description: "Comprehensive support for individuals seeking testing and linkage to care and treatment."
    //     },
    // ]


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleService = (value) => {
        localStorage.setItem("service", value);
    };

    const getServices = async () => {
        try {
            const servicesRef = collection(db, "services");
            const querySnapshot = await getDocs(servicesRef);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setServicesData(data);
        } catch (err) {
            console.log("Failed to fetch doc", err);
        }
    };

    useEffect(() => {
        getServices();
    }, []);
   

    const filteredServices = servicesData?.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()) || "")

    return (
        <div className='w-full flex flex-col items-center justify-center gap-[50px] px-4'>
            <p className='font-sans text-[#000000] text-[34px] lg:text-[52px] font-medium'>Our Services</p>
            <div className='flex items-center justify-center'>
                <input 
                    name='search'
                    placeholder='Search Services...'
                    value={search}
                    className='w-[300px] lg:w-[590px] h-[50px] outline-[#2D84FF] rounded-lg p-2 border border-[#E1E5F3]'
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className='flex flex-wrap gap-6 justify-center w-full mb-5'>
                { filteredServices?.length > 0 ?
                    filteredServices?.map((item) => (
                        <div 
                            key={item?.id}
                            style={{ backgroundColor: item?.color }}
                            className='cursor-pointer hover:shadow-xl p-4 lg:p-[31px] rounded-lg w-[300px] flex flex-col items-center justify-center h-[250px] lg:h-[250px] transition-all duration-300 relative'
                            onClick={() => { navigate("/steps"); handleService(item?.title); }}
                            onMouseEnter={!isMobile ? () => setHoveredCardId(item.id) : null}
                            onMouseLeave={!isMobile ? () => setHoveredCardId(null) : null}
                        >
                            <div className='flex flex-col items-center justify-center w-full relative'>
                                {/* Desktop View */}
                                {!isMobile && (
                                    <>
                                        {hoveredCardId === item.id ? (
                                            <p className='text-xs lg:text-[15px] font-ubuntu text-[#fff] font-normal text-center transition-opacity duration-300'>
                                                {item?.description}
                                            </p>
                                        ) : (
                                            <p className='text-sm lg:text-[25px] lg:leading-[30px] text-[#fff] font-medium text-center font-ubuntu transition-opacity duration-300'>
                                                {item?.title}
                                            </p>
                                        )}
                                    </>
                                )}

                                {/* Mobile View */}
                                {isMobile && (
                                    <>
                                        <p className='text-sm lg:text-[25px] lg:leading-[30px] text-[#fff] font-medium text-center font-ubuntu'>
                                            {item?.title}
                                        </p>
                                        <p className='text-xs lg:text-[15px] font-ubuntu text-[#fff] font-normal text-center'>
                                            {item?.description}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                    :
                    <p className='text-3xl font-sans font-medium mt-10'>No Services Available</p>
                }
            </div>
        </div>
    );
};

export default Services;
