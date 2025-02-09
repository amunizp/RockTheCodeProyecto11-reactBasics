import Header from './components/Header/Header'
import './App.css'
import Footer from './components/Footer/Footer'
import Home from './Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import About from './Pages/About/About'
import Today from './Pages/Today/Today'
import Fortnight from './Pages/Fortnight/Fortnight'
import FortnightNoon from './Pages/FortnightNoon/FortnightNoon'
import Detail from './Pages/Detail/Detail'

function App() {
  return (
    <div className='app'>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/today' element={<Today />} />
        <Route path='/fortnight' element={<Fortnight />} />
        <Route path='/fortnightnoon' element={<FortnightNoon />} />
        <Route path='/detail/:thedatetime' element={<Detail />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
