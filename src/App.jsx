import { useState } from 'react'
import Header from './components/Header/Header'
import './App.css'
import Footer from './components/Footer/Footer'
import Home from './Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import About from './Pages/About/About'
import { Router } from 'express'

function App() {
  return (
    <div className='app'>
      <Header titleName='Parkleys Humidity' />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
