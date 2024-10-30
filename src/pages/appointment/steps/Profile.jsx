import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { CgSpinner } from 'react-icons/cg';

const Profile = ({ handleSteps }) => {
    const [loading, setLoading] = useState(false)

    const submitForm = (values) => {
        const data = {
            fullName: values?.checked ? "Anonymous" : values?.fullName,
            emailOrphone: values?.emailOrphone
        }
        // console.log(data, "skip")
        // return
        localStorage.setItem("profile", JSON.stringify(data))
        handleSteps(2)
    }

  return (
    <div className='mt-[59px]'>
         <div>
            <Formik
                initialValues={{
                    fullName: "",
                    emailOrphone: "",
                    checked: false
                }}
                    // validationSchema={formValidationSchema}
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
                        <div className="flex flex-col  w-[504px] gap-6">

                            <div className='flex flex-col gap-1'>
                                <div className='flex gap-1.5 items-center'>
                                    <input 
                                        type="checkbox"
                                        name='checked'
                                        checked={values.checked} 
                                        value={values.checked} 
                                        onChange={handleChange}           //{() => setIsChecked(!isChecked)}
                                        className={`h-5 w-5 border rounded-sm ${values.checked ? 'bg-[#1EC677] border-[#1EC677]' : 'border-[#E5E5EA]'}`}  // Conditional styling
                                    />
                                    <p className='text-[#757575] font-sans text-sm'>
                                        Be Anonymous, keep your profile private.
                                    </p>
                                </div>
                            </div>

                            {values?.checked ? 
                                null 
                                : 
                                <div className='flex flex-col gap-[6px]  w-full'>
                                    <label className='font-mulish font-semibold text-[#333333] text-base '>Full Name</label>
                                    <input
                                        name="fullName"
                                        placeholder="Your Full Name"
                                        type="text" 
                                        value={values?.fullName}
                                        onChange={handleChange}
                                        className="outline-none bg-[#F2F2F2] text-[#424242] font-mulish text-base rounded-xl p-2 h-[56px]"
                                    />
                                    {errors.fullName && touched.fullName ? (
                                    <div className="text-RED-_100 text-xs">
                                        {errors.fullName}
                                    </div>
                                    ) : null}
                                </div>
                            }
                            

                            <div className='flex flex-col w-full gap-[6px]'>
                                <label className='font-mulish font-semibold text-[#333333] text-base'>Email or Phone Number</label>
                                <input
                                    name="emailOrphone"
                                    placeholder="Your Email or Phone Number"
                                    type="text" 
                                    value={values?.emailOrphone}
                                    onChange={handleChange}
                                    className="outline-none bg-[#F2F2F2] text-[#424242] font-mulish text-base rounded-xl p-2 h-[56px]"
                                />
                                {errors.emailOrphone && touched.emailOrphone ? (
                                <div className="text-RED-_100 text-xs">
                                    {errors.emailOrphone}
                                </div>
                                ) : null}
                            </div>
                            

                            <button
                                className={`${isValid ? "bg-[#2D7FF9]" : "bg-[#BABABA]"} w-full flex items-center cursor-pointer rounded-[14px] justify-center mt-[22px] h-[51px] text-center`}
                                type="submit"
                                disabled={!isValid}
                            >
                                <p className='text-[#fff] text-[20px] font-mulish font-bold'>{loading ? <CgSpinner className=" animate-spin text-lg " /> : 'Next'}</p>
                                
                            </button>
                           
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    </div>
  )
}

export default Profile