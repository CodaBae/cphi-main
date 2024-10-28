import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../layout'
import Landing from '../pages/appointment/Landing'
import Services from '../pages/appointment/Services'
import Steps from '../pages/appointment/steps'
import Confirmed from '../pages/appointment/Confirmed'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Landing />} />
        <Route element={<Layout />}>
            <Route path='/services' element={<Services />} />
            <Route path='/steps' element={<Steps />} />
            <Route path='/confirmed' element={<Confirmed />} />
        </Route>
       
    
    </Routes>
  )
}

export default Routers