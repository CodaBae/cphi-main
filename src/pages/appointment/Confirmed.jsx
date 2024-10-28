import React from 'react'
import Tick from "../../assets/svg/tick.svg"
import Share from "../../assets/svg/share.svg"
import { FaCalendar } from 'react-icons/fa6'


const Confirmed = () => {

    const generateICSFile = () => {
        const eventDetails = {
          name: "Booking",
          description: "Booking Confirmation",
          startDate: "2023-02-25T13:22:00",
          endDate: "2023-02-25T14:22:00",
          location: "1 Akintunde Cl, off Andoyi Street, Onike, Lagos 100001, Lagos, Nigeria",
        };
    
        const icsContent = `
          BEGIN:VCALENDAR
          VERSION:2.0
          BEGIN:VEVENT
          SUMMARY:${eventDetails.name}
          DESCRIPTION:${eventDetails.description}
          DTSTART:${eventDetails.startDate.replace(/[-:]/g, '')}Z
          DTEND:${eventDetails.endDate.replace(/[-:]/g, '')}Z
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

      const handleShare = () => {
        if (navigator.share) {
          navigator.share({
            title: 'Booking Confirmation',
            text: 'Check out this booking confirmation!',
            url: window.location.href, // Change this to your specific URL if needed
          })
          .catch((error) => console.error('Error sharing', error));
        } else {
          alert('Share options are not available on your device.');
        }
      };
      


  return (
    <div className='flex flex-col items-center gap-[34px] mb-10'>
        <div className='w-[575px] mt-[59px] flex flex-col mx-auto shadow-lg rounded-lg p-[34px]'>
            <div className='flex flex-col items-center gap-[26px]'>
                <div className='rounded-full bg-[#23A26D1F] w-[93px] p-[19px] h-[93px]'>
                    <img src={Tick} alt='Tick' className='w-[53px] h-[53px]' />
                </div>
                <p className='text-[#474747] font-poppins text-[26px]'>Booking Completed!</p>
            </div>
            <div className='bg-[#EDEDED] mt-[53px] w-full h-1'></div>

            <div className='mt-[53px] flex flex-col gap-[53px]'>
                <div className='flex flex-col gap-[23px]'>
                    <div className='flex items-center justify-between'>
                        <p className='font-poppins text-[#707070] font-bold text-[21px]'>Date</p>
                        <p className='font-poppins text-[#121212] font-medium text-[21px]'>25-02-2023</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='font-poppins text-[#707070] font-bold text-[21px]'>Time</p>
                        <p className='font-poppins text-[#121212] font-medium text-[21px]'>13:22:16</p>
                    </div>
                </div>

                <div className='flex flex-col gap-[23px]'>
                    <p className='font-poppins font-bold text-[#707070] text-[21px]'>Location</p>
                    <p className='text-[#707070] font-poppins text-[21px]'>
                        1 Akintunde Cl, off Andoyi Street, Onike, Lagos 100001, Lagos, Nigeria
                    </p>
                </div>

                <div className='flex flex-col gap-[23px]'>
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
                onClick={handleShare}
            >
                <img src={Share} alt='Share'  className='w-[25px] h-[25px] text-[#FFFFFF] '/>
                <p className='font-mulish font-bold text-[20px] mt-1 text-[#fff]'>Refer A Friend</p>
            </div>

        </div>
    </div>
  )
}

export default Confirmed