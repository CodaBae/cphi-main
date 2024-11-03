import React, { useEffect, useState } from 'react'
import { Form, Formik } from "formik"
import zxcvbn from 'zxcvbn'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { toast } from 'react-toastify'
import { CgSpinner } from 'react-icons/cg'
import { Listbox } from '@headlessui/react'
import { IoIosArrowDown } from 'react-icons/io'
import { doc, setDoc } from 'firebase/firestore';

import { db } from '../../../firebase-config'


const types = ["Select Type", "Individual", "Organization"];

const Register = () => {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0); 
    const [selectedType, setSelectedType] = useState(types[0])
    const [isChecked, setIsChecked] = useState(false); 

  
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

    const navigate = useNavigate()

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto'; // reset on unmount
        };
    }, []); 
    

    
    const calculatePasswordStrength = (password) => {
        const strength = zxcvbn(password);
        setPasswordStrength(strength.score);
    }

    const formValidationSchema = Yup.object().shape({
        type: Yup.string().required("Type is required"),
        fullName: Yup.string().required("Full Name is Required"),
        emailOrPhone: Yup.string().required("Email or Phone is required"),
        password: Yup.string().required("Password is required"),
        checked: Yup.boolean().oneOf([true], 'Terms and conditions must be accepted'),
    })

    const generateReferrerCode = () => {
        return Math.random().toString(36).substring(2, 10).toUpperCase(); // 8-character code
    };


    const submitForm = async (values) => {
        setLoading(true);
        try {
            const referrerCode = generateReferrerCode();
            await setDoc(doc(db, 'users', values.emailOrPhone), {
                ...values,
                type: selectedType,
                referrerCode,
                createdAt: new Date(),
            });
            toast.success('Account created successfully!');
            localStorage.setItem("emailOrPhone", values?.emailOrPhone)
            navigate('/dashboard');
        } catch (error) {
            toast.error('Failed to create account. Try again.');
            console.error('Error adding document: ', error);
        } finally {
            setLoading(false);
        }
    };


  return (
    <div className='bg-[#fff] w-full flex flex-col  h-screen'>
       
        <div className='w-full  mt-[20px] gap-[18px]  flex flex-col items-center justify-center '>
           
            <div className='flex flex-col gap-1'>
                <p className='text-[#1C1C1E] font-poppins text-[26px] lg:text-[34px] font-bold'>Sign Up</p>
            </div>
            <div>
                <Formik
                    initialValues={{
                        type: "",
                        fullName: "",
                        emailOrPhone: "",
                        password: "",
                        checked: false
                    }}
                        validationSchema={formValidationSchema}
                        onSubmit={(values, action) => {
                        window.scrollTo(0, 0);
                        console.log(values, "market")
                        submitForm(values, action);
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        dirty,
                        isValid,
                        setFieldValue,
                        errors,
                        touched,
                        // setFieldTouched,
                        values,
                    }) => (
                        <Form onSubmit={handleSubmit} className="flex justify-center ">
                            <div className="flex flex-col w-11/12  lg:w-[520px] gap-6">

                                <div>
                                    <Listbox 
                                        value={selectedType} 
                                        onChange={(value) => {
                                            setSelectedType(value);
                                            setFieldValue("type", value);
                                        }}
                                    >
                                        <div className="relative mt-1">
                                            <Listbox.Button className="w-full h-[51px] font-mulish text-[#424242] cursor-pointer hover:border-[#2D84FF] border border-[#E5E5EA] rounded-md bg-[#FFF] px-4 py-2 text-left">
                                                <div className='flex items-center justify-between'>
                                                    <p className='font-mulish text-[#424242] text-base'>{selectedType}</p>
                                                    <IoIosArrowDown
                                                        className="h-5 w-5 text-[#2D84FF]"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                            </Listbox.Button>
                                            <Listbox.Options className="absolute mt-1 w-full rounded-md bg-[#fff] z-20 shadow-lg">
                                                {types.map((type) => (
                                                    <Listbox.Option
                                                        key={type}
                                                        value={type}
                                                        className={({ active }) =>
                                                        `cursor-pointer select-none px-4 py-2 ${active ? 'bg-blue-100' : ''}`
                                                        }
                                                    >
                                                        {type}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </div>
                                    </Listbox>
                                </div>
                                
                                <div className='flex flex-col  w-full'>
                                    <input
                                        name="fullName"
                                        placeholder="Your Full Name"
                                        type="text" 
                                        value={values?.fullName}
                                        onChange={handleChange}
                                        className="outline-[#2D84FF] bg-[#FFF] text-[#3A3A3C] font-poppins text-base rounded-lg border border-[#E5E5EA] p-2 h-[56px] border-solid "
                                    />
                                    {errors.fullName && touched.fullName ? (
                                    <div className="text-RED-_100 text-xs">
                                        {errors.fullName}
                                    </div>
                                    ) : null}
                                </div>

                                <div className='flex flex-col w-full'>
                                    <input
                                        name="emailOrPhone"
                                        placeholder="Your Email Or Phone Number"
                                        type="text" 
                                        value={values?.emailOrPhone}
                                        onChange={handleChange}
                                        className="outline-[#2D84FF] bg-[#FFF] text-[#3A3A3C] font-poppins text-base rounded-lg border border-[#E5E5EA] p-2 h-[56px] border-solid "
                                    />
                                    {errors.emailOrPhone && touched.emailOrPhone ? (
                                    <div className="text-RED-_100 text-xs">
                                        {errors.emailOrPhone}
                                    </div>
                                    ) : null}
                                </div>
                                
                                <div className='gap-2 flex flex-col'>
                                    <div className='flex flex-col w-full'>
                                        <div className='relative'>
                                            <input
                                                name="password"
                                                placeholder="Password"
                                                type={showPassword ? "text" : "password"} 
                                                value={values?.password}
                                                onChange={(e) => {
                                                    handleChange(e)
                                                    calculatePasswordStrength(e.target.value);  
                                                }}
                                                className="outline-[#2D84FF] bg-[#FFF] w-full text-[#3A3A3C] font-poppins text-base rounded-lg border border-[#E5E5EA] p-2 h-[56px] border-solid "
                                            />
                                                {showPassword ? (
                                                    <BsEyeSlash
                                                        className=" absolute top-[18px] right-4 text-[22px] lg:right-3 cursor-pointer text-[#AEAEB2]"
                                                        onClick={togglePasswordVisibility}
                                                    />
                                                    ) : (
                                                    <BsEye
                                                        className=" absolute top-[18px] text-[22px] right-4 lg:right-3 cursor-pointer text-[#AEAEB2]"
                                                        onClick={togglePasswordVisibility}
                                                    />
                                                )}
                                        </div>
                                        {errors?.password || touched?.password ? (
                                        <div className="text-RED-_100 text-xs">
                                            {errors?.password}
                                        </div>
                                        ) : null}
                                    </div>
                                    <div className={`${values?.password ? "mb-2" : "hidden"}`}>
                                        <p className={`text-sm  font-poppins ${passwordStrength === 0 ? 'text-red-500' : passwordStrength === 1 ? 'text-orange-500' : passwordStrength === 2 ? 'text-yellow-500' : passwordStrength === 3 ? 'text-green-400' : 'text-green-600'}`}>
                                            {passwordStrength === 0 && "Password Strength: Weak"}
                                            {passwordStrength === 1 && "Password Strength: Fair"}
                                            {passwordStrength === 2 && "Password Strength: Good"}
                                            {passwordStrength === 3 && "Password Strength: Strong"}
                                            {passwordStrength === 4 && "Password Strength: Very Strong"}
                                        </p>
                                        <div className="w-full h-2 bg-[#E5E5EA] rounded-lg">
                                            <div
                                                className={`h-full rounded-lg ${passwordStrength === 0 ? 'bg-[#f00]' : passwordStrength === 1 ? 'bg-[#0ff]' : passwordStrength === 2 ? 'bg-[#ff0]' : passwordStrength === 3 ? 'bg-[#34C759CC]' : 'bg-[#34C759CC]'}`}
                                                style={{ width: `${(passwordStrength + 1) * 20}%` }} 
                                            />
                                        </div>
                                    
                                    </div>
                                </div>
                            
                                
                                <div className='flex flex-col gap-1'>
                                    <div className='flex gap-1.5 items-center'>
                                        <input 
                                            type="checkbox"
                                            name='checked'
                                            checked={values.checked} 
                                            value={values.checked} 
                                            onChange={handleChange}           //{() => setIsChecked(!isChecked)}
                                            className={`h-5 w-5 border rounded-sm ${values.checked ? 'bg-[#2D84FF] border-[#2D84FF]' : 'border-[#E5E5EA]'}`}  // Conditional styling
                                        />
                                        <p className='text-[#1C1C1E] font-poppins text-sm'>
                                            I’ve read and agree with <span className='text-[#2D84FF] cursor-pointer'>Terms of Service</span> and our <span className='text-[#2D84FF] cursor-pointer'>Privacy Policy</span>
                                        </p>
                                    </div>
                                    {errors.checked && touched.checked ? (
                                    <div className="text-RED-_100 text-xs">
                                        {errors.checked}
                                    </div>
                                    ) : null}

                                </div>

                                <button
                                    className={`${isValid ? "bg-[#2D84FF]" : "bg-[#BABABA]"} w-full font-poppins flex items-center rounded-[6px] justify-center mt-[32px] h-[46px] text-base text-center`}
                                    type="submit"
                                    disabled={!isValid || loading}
                                >
                                    <p className='text-[#fff] text-sm font-poppins font-semibold'>{loading ? <CgSpinner className=" animate-spin text-lg " /> : 'Create An Account'}</p>
                                    
                                </button>
                                <p className='font-poppins text-sm mt-[8px] text-center lg:mt-0'>Already have an Account? <span className='cursor-pointer font-semibold font-poppins text-[#2D84FF]' onClick={() => navigate("/login")}>Sign In</span></p>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>


        </div>
       
    </div>
  )
}

export default Register