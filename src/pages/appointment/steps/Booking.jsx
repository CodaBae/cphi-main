import React, { useEffect, useState } from 'react';
import { Formik, Form} from 'formik';
import { Listbox } from '@headlessui/react';
import { FiCalendar, FiClock } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoIosArrowDown } from 'react-icons/io';
import { CgSpinner } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { lagosLGAs, riversStateLGAs } from './Lgas';

import { db } from '../../../firebase-config';

const locations = ["Select Location", "Lagos", "Port Harcourt"];
const sexOptions = ["", "Male", "Female"]

const Booking = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedSex, setSelectedSex] = useState(sexOptions[0]);
  const [localGovernments, setLocalGovernments] = useState([]);
  const [selectedLg, setSelectedLg] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [referrerName, setReferrerName] = useState("") 


  const navigate = useNavigate()

  const referrerCode = localStorage.getItem("referrerCode")
  const about = JSON.parse(localStorage.getItem("about"))
  const profile = JSON.parse(localStorage.getItem("profile"))

  const getReferrerName = async () => {
    if (referrerCode) {
      try {
        const q = query(collection(db, 'users'), where('referrerCode', '==', referrerCode));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          setReferrerName(docData.fullName); 
        } else {
          console.log('No document found with the given referrerCode!');
        }
      } catch (error) {
        console.error('Error fetching referrer name:', error);
      }
    }
  };

  useEffect(() => {
    getReferrerName()
  }, [])

  // Update local governments list based on selected location
  useEffect(() => {
    if (selectedLocation === "Lagos") {
      setLocalGovernments(lagosLGAs);
    } else if (selectedLocation === "Port Harcourt") {
      setLocalGovernments(riversStateLGAs);
    } else {
      setLocalGovernments([]);
    }
    setSelectedLg(""); // Reset LG when location changes
  }, [selectedLocation]);

  const submitForm = async (values) => {
    setLoading(true); 
    const data = {
        location: selectedLocation,
        address: selectedLocation === "Lagos" ? "1 Akintunde Cl, off Andoyi Street, Onike, Lagos 100001, Lagos, Nigeria" : "15 Omerelu Street, New GRA, Port Harcourt 500272, Rivers, Nigeria",
        date: new Date(values?.date).toLocaleDateString(),
        time: new Date(values?.time).toLocaleTimeString(),
        referrerCode,
        referrerName,
        lg: selectedLg,
        sex: selectedSex, 
        about,
        profile,
        hivStatus: "Unconfirmed", 
        status: "Pending"
    };

    try {
        const docRef = await addDoc(collection(db, "referrals"), data);
        const actRef = await addDoc(collection(db, "activity"), data);
        localStorage.setItem("client", JSON.stringify(data))
        navigate("/confirmed"); 

       
    } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("There was an error submitting the form. Please try again."); 
    } finally {
        setLoading(false); 
    }
  };

  return (
    <div className="p-4 mt-[59px] w-11/12 lg:w-auto ">
      <Formik
        initialValues={{ location: selectedLocation, date: selectedDate, sex:selectedSex, time: selectedTime }}
        onSubmit={(values) => {

          submitForm(values)
         
        }}
      >
        {({ setFieldValue, isValid }) => (
          <Form className='w-full'>
            <div className="mb-4">
              <label className="block text-base font-mulish font-semibold text-[#333333]">
                Location <span className="text-RED-_100">*</span>
              </label>
              <Listbox 
                value={selectedLocation} 
                onChange={(value) => {
                  setSelectedLocation(value);
                  setFieldValue("location", value);
                }}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="w-full h-[51px] font-mulish text-[#424242] cursor-pointer rounded-md bg-[#F2F2F2] px-4 py-2 text-left">
                    <div className='flex items-center justify-between'>
                        <p className='font-mulish text-[#424242] text-base'>{selectedLocation}</p>
                        <IoIosArrowDown
                            className="h-5 w-5 text-[#2D84FF]"
                            aria-hidden="true"
                        />
                    </div>
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 w-full rounded-md bg-[#fff] z-20 shadow-lg">
                    {locations.map((location) => (
                      <Listbox.Option
                        key={location}
                        value={location}
                        className={({ active }) =>
                          `cursor-pointer select-none px-4 py-2 ${active ? 'bg-blue-100' : ''}`
                        }
                      >
                        {location}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            <div className="mb-4">
              <label className="block text-base font-mulish font-semibold text-[#333333]">
                Local Government <span className="text-RED-_100">*</span>
              </label>
              <Listbox 
                value={selectedLg} 
                onChange={(value) => {
                  setSelectedLg(value);
                  setFieldValue("lg", value);
                }}
                disabled={!selectedLocation || selectedLocation === "Select Location"}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="w-full h-[51px] font-mulish text-[#424242] cursor-pointer rounded-md bg-[#F2F2F2] px-4 py-2 text-left">
                    <div className='flex items-center justify-between'>
                        <p className='font-mulish text-[#424242] text-base'>{selectedLg || "Select Local Government"}</p>
                        <IoIosArrowDown
                            className="h-5 w-5 text-[#2D84FF]"
                            aria-hidden="true"
                        />
                    </div>
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 w-full rounded-md bg-[#fff] z-20 shadow-lg">
                    {localGovernments.map((lg) => (
                      <Listbox.Option
                        key={lg}
                        value={lg}
                        className={({ active }) =>
                          `cursor-pointer select-none px-4 py-2 ${active ? 'bg-blue-100' : ''}`
                        }
                      >
                        {lg}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
            
            <div className="mb-4">
              <label className="block text-base font-mulish font-semibold text-[#333333]">
                Sex <span className="text-RED-_100">*</span>
              </label>
              <Listbox 
                value={selectedSex} 
                onChange={(value) => {
                  setSelectedSex(value);
                  setFieldValue("sex", value);
                }}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="w-full h-[51px] font-mulish text-[#424242] cursor-pointer rounded-md bg-[#F2F2F2] px-4 py-2 text-left">
                    <div className='flex items-center justify-between'>
                        <p className='font-mulish text-[#424242] text-base'>{selectedSex || "Select Sex"}</p>
                        <IoIosArrowDown
                            className="h-5 w-5 text-[#2D84FF]"
                            aria-hidden="true"
                        />
                    </div>
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 w-full rounded-md bg-[#fff] z-20 shadow-lg">
                    {sexOptions.map((gen) => (
                      <Listbox.Option
                        key={gen}
                        value={gen}
                        className={({ active }) =>
                          `cursor-pointer select-none px-4 py-2 ${active ? 'bg-blue-100' : ''}`
                        }
                      >
                        {gen}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            <div className="mb-4 mt-[43px]">
              <label className="block text-base font-mulish font-semibold text-[#333333]">
                Select Appointment Time <span className="text-RED-_100">*</span>
              </label>
              <div className="flex items-center space-x-4 mt-2 bg-[#F2F2F2] rounded-md p-2 h-[51px]">
    
                <div className="flex items-center space-x-2 ">
                  <FiCalendar className="text-gray-600" />
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setFieldValue("date", date);
                    }}
                    dateFormat="EEE MM/dd"
                    placeholderText="Select Date"
                    className="bg-[#F2F2F2] font-roboto text-[#333333] w-10/12 lg:w-full outline-none"
                  />
                </div>

          
                <span className="text-gray-400">|</span>

         
                <div className="flex items-center space-x-2">
                  <FiClock className="text-gray-600" />
                  <DatePicker
                    selected={selectedTime}
                    onChange={(time) => {
                      setSelectedTime(time);
                      setFieldValue("time", time);
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="HH:mm"
                    placeholderText="Select Time"
                    className="bg-[#F2F2F2] font-roboto text-[#333333] w-10/12 lg:w-full outline-none"
                  />
                </div>
              </div>
            </div>

            
            <button
                className={`${isValid ? "bg-[#2D7FF9]" : "bg-[#BABABA]"} w-full flex items-center rounded-lg justify-center mt-[51px] h-[51px] text-center`}
                type="submit"
                disabled={!isValid}
            >
                <p className='text-[#fff] text-[20px] font-mulish font-bold'>{loading ? <CgSpinner className=" animate-spin text-lg " /> : 'Done'}</p>
                
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Booking;
