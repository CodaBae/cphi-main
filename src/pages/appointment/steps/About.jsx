import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { CgSpinner } from 'react-icons/cg';

const About = ({ handleSteps }) => {
    const [loading, setLoading] = useState(false)

    const submitForm = () => {
        handleSteps(3)
    }

    const service = localStorage.getItem("service")

  return (
   <div className='mt-[59px]'>
         <div>
            <Formik
                initialValues={{
                    story: "",
                    checked: false,
                    consultationCheck: false,
                    treatmentCheck: false,
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

                            <div className='flex flex-col gap-[6px]  w-full'>
                                <label className='font-mulish font-semibold text-[#333333] text-base'>Tell us your story. Why do you think you need an {service}?</label>
                                <textarea
                                    name="story"
                                    placeholder="Your Story"
                                    type="text" 
                                    value={values?.story}
                                    onChange={handleChange}
                                    className="outline-none bg-[#F2F2F2] text-[#424242] font-mulish text-base rounded-lg p-2 h-[220px]"
                                ></textarea>
                                {errors.story && touched.story ? (
                                <div className="text-RED-_100 text-xs">
                                    {errors.story}
                                </div>
                                ) : null}
                            </div>


                            <div className='flex flex-col gap-2'>
                                <label className='font-mulish font-semibold text-[#333333] text-base'>Please select the services you want</label>
                                <div className='flex gap-1.5 items-center'>
                                    <input 
                                        type="checkbox"
                                        name='consultationCheck'
                                        checked={values.consultationCheck} 
                                        value={values.consultationCheck} 
                                        onChange={handleChange}           //{() => setIsChecked(!isChecked)}
                                        className={`h-5 w-5 border rounded-sm ${values.consultationCheck ? 'bg-[#1EC677] border-[#1EC677]' : 'border-[#E5E5EA]'}`}  // Conditional styling
                                    />
                                    <p className='text-[#757575] font-sans text-sm'>
                                        Consultation (Talk to a Doctor) 
                                    </p>
                                </div>
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
                                        {service} {/* Test for   */}
                                    </p>
                                </div>
                                <div className='flex gap-1.5 items-center'>
                                    <input 
                                        type="checkbox"
                                        name='treatmentCheck'
                                        checked={values.treatmentCheck} 
                                        value={values.treatmentCheck} 
                                        onChange={handleChange}           //{() => setIsChecked(!isChecked)}
                                        className={`h-5 w-5 border rounded-sm ${values.treatmentCheck ? 'bg-[#1EC677] border-[#1EC677]' : 'border-[#E5E5EA]'}`}  // Conditional styling
                                    />
                                    <p className='text-[#757575] font-sans text-sm'>
                                        Get treatment
                                    </p>
                                </div>
                            </div>
                            

                            <button
                                className={`${isValid ? "bg-[#2D7FF9]" : "bg-[#BABABA]"} w-full flex items-center rounded-[14px] justify-center mt-[32px] h-[51px] text-center`}
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

export default About