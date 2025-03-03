import PageTitle from '../../components/PageTitle/PageTitle'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <article className='home'>
      <div className='page-container'>
        <PageTitle>Parkleys Condensation Monitor</PageTitle>

        <div className='info-box'>
          <h3>Welcome to our Estate Humidity Monitor</h3>
          <p>
            This tool helps residents track humidity levels and potential
            condensation issues in our estate.
          </p>
        </div>

        <div className='card'>
          <h3 className='section-title'>Why Monitor Humidity?</h3>
          <p className='section-description'>
            High humidity levels can lead to condensation on windows and walls,
            potentially causing mold and property damage. Our monitoring system
            helps you stay informed about current conditions.
          </p>
        </div>

        <div className='features-grid'>
          <Link to='/today' className='feature-card'>
            <h3>Today's Humidity</h3>
            <p>Check today's humidity levels at noon</p>
            <div className='icon'>🌧️</div>
          </Link>

          <Link to='/fortnight' className='feature-card'>
            <h3>Two-Week View</h3>
            <p>Monitor humidity trends over a fortnight</p>
            <div className='icon'>📊</div>
          </Link>

          <Link to='/fortnightnoon' className='feature-card'>
            <h3>Noon Readings</h3>
            <p>Compare noon readings across two weeks</p>
            <div className='icon'>🕛</div>
          </Link>

          <Link to='/about' className='feature-card'>
            <h3>About</h3>
            <p>Learn more about this monitoring system</p>
            <div className='icon'>ℹ️</div>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default Home
