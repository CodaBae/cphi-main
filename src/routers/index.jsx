import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PageLayout from '../layout/PageLayout'
import Landing from '../pages/appointment/Landing'
import Services from '../pages/appointment/Services'
import Steps from '../pages/appointment/steps'
import Confirmed from '../pages/appointment/Confirmed'
import ReferralLanding from '../pages/referral/ReferralLanding'
import Register from '../pages/referral/auth/Register'
import Login from '../pages/referral/auth/Login'
import ChangePassword from '../pages/referral/auth/ChangePassword'
import ResetPassword from '../pages/referral/auth/ResetPassword'
import DashboardLayout from '../layout/DashboardLayout'
import Dashboard from '../pages/dashboard'
import Referrals from '../pages/dashboard/Referrals'
import ProtectRoute from "./ProtectRoute"

const Routers = () => {
  return (
    <Routes>
        <Route element={<PageLayout />}>
            <Route path='/services' element={<Services />} />
            <Route path='/steps' element={<Steps />} />
            <Route path='/confirmed' element={<Confirmed />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        <Route path='/ref/:id' element={<Landing />} />
        <Route path='/' element={<ReferralLanding />} /> {/* /:id */}
        <Route element={<DashboardLayout />}>
            <Route path='/dashboard' element={<ProtectRoute><Dashboard /></ProtectRoute>} />
            <Route path='/details' element={<Referrals />} />
        </Route>
    
    </Routes>
  )
}

export default Routers