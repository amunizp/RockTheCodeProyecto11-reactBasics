import { Link, NavLink } from 'react-router-dom'
import './Header.css'

const Header = ({ titleName = 'Parkleys Humidity' }) => {
  return (
    <header className='header'>
      <h1>{titleName}</h1>
      <nav>
        <ul>
          <li>
            <NavLink to='/' activeclassname='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/about'
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink to='/today' activeclassname='active'>
              Today
            </NavLink>
          </li>
          <li>
            <NavLink to='/fortnight' activeclassname='active'>
              Fortnight
            </NavLink>
          </li>
          <li>
            <NavLink to='/fortnightNoon' activeclassname='active'>
              Fortnight Noon
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
