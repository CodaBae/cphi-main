import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom';

import Lock from "../../../assets/svg/lock.svg"
import { toast } from 'react-toastify';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase-config';

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const formValidationSchema = Yup.object().shape({
        emailOrPhone: Yup.string().required("Email or Phone is required"),
        password: Yup.string().required("Password is required"),
    })

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto'; // reset on unmount
        };
    }, []);

    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submitForm = async (values) => {
        setLoading(true);
        try {
            const usersRef = collection(db, "users");
            const userQuery = query(usersRef, where("emailOrPhone", "==", values.emailOrPhone));
            const querySnapshot = await getDocs(userQuery);
    
            if (querySnapshot.empty) {
                // User doesn't exist
                toast.error("User not found! Please check your email/phone.");
            } else {
                // Check if password matches
                const userData = querySnapshot.docs[0].data();
                if (userData.password === values.password) {
                    // Successful login, navigate to dashboard
                    localStorage.setItem("emailOrPhone", values.emailOrPhone);
                    toast.success("Login Success");
                    navigate("/dashboard");
                } else {
                    // Incorrect password
                    toast.error("Incorrect password. Please try again.");
                }
            }
        } catch (error) {
            console.error("Error checking user:", error);
            alert("An error occurred while trying to log in. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    

  return (
    <div className='bg-[#fff] w-full flex flex-col  h-screen'>
       
        <div className='w-full mt-[20px] gap-[18px]  flex flex-col items-center justify-center '>
           
            <div className='flex flex-col gap-1'>
                <p className='text-[#1C1C1E] font-poppins text-[26px] lg:text-[34px] font-bold'>Sign In</p>
            </div>
            <div>
                <Formik
                    initialValues={{
                        emailOrPhone: "",
                        password: "",
                        check: false
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
                            <div className="flex flex-col w-[310px] lg:w-[520px] gap-6">

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
                                
                                <div style={{
                                    minHeight: "60px"
                                }}>
                                    <div className='flex flex-col w-full'>
                                        <div className='relative'>
                                            <input
                                                name="password"
                                                placeholder="Password"
                                                type={showPassword ? "text" : "password"} 
                                                value={values?.password}
                                                onChange={(e) => {
                                                    handleChange(e)
                                                    
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
                                </div>
                              
                                <div className='flex items-center justify-between'>
                                    <div className='flex gap-1.5 items-center'>
                                    <input 
                                        type="checkbox"
                                        value={values.check}
                                        onChange={handleChange}
                                        className="custom-checkbox" // Add this class for the custom styles
                                    />
                                        <p className='text-[#1C1C1E] font-poppins text-sm'>Stay signed in</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <img src={Lock} alt='Lock' className='w-6 h-6' />
                                        <p onClick={() => navigate('/reset-password')} className="text-[#2D84FF] font-poppins text-xs mt-1.5 font-semibold cursor-pointer">Forgot Password?</p>
                                    </div>
                                </div>
                                
                                <button
                                    className={`${isValid ? "bg-[#2D84FF]" : "bg-[#BABABA]"} w-full font-poppins flex items-center rounded-[6px] justify-center mt-[32px] h-[46px] text-base text-center`}
                                    type="submit"
                                    disabled={!isValid}
                                >
                                    <p className='text-[#fff] text-sm font-poppins font-semibold'>{loading ? <CgSpinner className=" animate-spin text-lg " /> : 'Sign In'}</p>
                                    
                                </button>
                                <p className='font-poppins text-sm mt-[8px] text-center lg:mt-0'>Don't have an Account? <span className='cursor-pointer font-semibold font-poppins text-[#2D84FF]' onClick={() => navigate("/register")}>Sign up</span></p>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>


        </div>
       
    </div>
  )
}

export default Login