import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Routers from './routers'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify'

function App() {


  return (
    <>
      <Routers />
      <ToastContainer />
    </>
  )
}

export default App
