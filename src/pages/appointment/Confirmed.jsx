import React, { useEffect, useState } from 'react'
import Tick from "../../assets/svg/tick.svg"
import Share from "../../assets/svg/share.svg"
import { FaCalendar } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'


const Confirmed = () => {
    
    

    const client = JSON.parse(localStorage.getItem("client"))
    const referrerCode = localStorage.getItem("referrerCode")
    console.log(client, "client")




    const generateICSFile = () => {
        const eventDetails = {
          name: "Booking",
          description: "Booking Confirmation",
          startDate: `${client?.date}T${client?.time}` || "N/A",
        //   endDate: "2023-02-25T14:22:00",
          location: client?.location || "N/A",
        };

        // DTEND:${eventDetails.endDate.replace(/[-:]/g, '')}Z 

        const icsContent = `
          BEGIN:VCALENDAR
          VERSION:2.0
          BEGIN:VEVENT
          SUMMARY:${eventDetails.name}
          DESCRIPTION:${eventDetails.description}
          DTSTART:${eventDetails.startDate.replace(/[-:]/g, '')}Z
          LOCATION:${eventDetails.location}
          END:VEVENT
          END:VCALENDAR`
        .trim();
    
        const blob = new Blob([icsContent], { type: "text/calendar" });
        const url = URL.createObjectURL(blob);
    
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "event.ics";
        downloadLink.click();
    
        URL.revokeObjectURL(url);
      };

    //   const handleShare = () => {
    //     if (navigator.share) {
    //       navigator.share({
    //         title: 'Booking Confirmation',
    //         text: 'Check out this booking confirmation!',
    //         url: window.location.href, // Change this to your specific URL if needed
    //       })
    //       .catch((error) => console.error('Error sharing', error));
    //     } else {
    //       alert('Share options are not available on your device.');
    //     }
    //   };

      const navigate = useNavigate()
      
      useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto'; 
        };
    }, []); 


  return (
    <div className='flex flex-col items-center gap-[14px] mb-10'>
        <div className='w-[575px]  flex flex-col mx-auto border border-dashed border-[#2D84FF] rounded-lg p-[34px]'>
            <div className='flex flex-col items-center gap-[6px]'>
                <div className='rounded-full bg-[#23A26D1F] flex flex-col items-center w-[53px] p-[10px] h-[53px]'>
                    <img src={Tick} alt='Tick' className='w-[43px] h-[43px]' />
                </div>
                <p className='text-[#474747] font-poppins text-[26px]'>Booking Completed!</p>
            </div>
            <div className='bg-[#EDEDED] mt-[13px] w-full h-1'></div>

            <div className='mt-[23px] flex flex-col gap-[13px]'>
                <div className='flex flex-col gap-[23px]'>
                    <div className='flex items-center justify-between'>
                        <p className='font-poppins text-[#707070] font-bold text-[21px]'>Date</p>
                        <p className='font-poppins text-[#121212] font-medium text-[21px]'>{client?.date || "N/A"}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='font-poppins text-[#707070] font-bold text-[21px]'>Time</p>
                        <p className='font-poppins text-[#121212] font-medium text-[21px]'>{client?.time || "N/A"}</p>
                    </div>
                </div>

                <div className='flex flex-col gap-[3px]'>
                    <p className='font-poppins font-bold text-[#707070] text-[21px]'>Location</p>
                    <p className='text-[#707070] font-poppins text-[21px]'>
                        {client?.location || "N/A"}
                    </p>
                </div>

                <div className='flex flex-col gap-[3px]'>
                    <p className='font-poppins font-bold text-[#707070] text-[21px]'>Contact Number (Free Call)</p>
                    <p className='text-[#707070] font-poppins text-[21px]'>
                        +234 800 002 2744
                    </p>
                </div>
            </div>
        </div>

        <div className='flex items-center gap-[32px]'>
            <div
                onClick={generateICSFile}
                className='flex items-center justify-center gap-3 rounded-lg cursor-pointer bg-[#2D7FF9] w-[258px] h-[53px] p-2'
            >
                <FaCalendar className='w-[25px] h-[25px] text-[#FFFFFF]' />
                <p className='font-mulish font-bold text-[20px] mt-1 text-[#fff]'>Add to Calendar</p>
            </div>

            <div 
                className='flex items-center justify-center gap-3 rounded-lg cursor-pointer bg-[#FF9000] w-[258px] h-[53px] p-2'
                onClick={() => navigate(`/referral${referrerCode}`)}
            >
                <img src={Share} alt='Share'  className='w-[25px] h-[25px] text-[#FFFFFF] '/>
                <p className='font-mulish font-bold text-[20px] mt-1 text-[#fff]'>Refer A Friend</p>
            </div>

        </div>
    </div>
  )
}

export default Confirmed