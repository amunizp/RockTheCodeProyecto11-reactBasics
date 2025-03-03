import { useEffect, useState } from 'react'
import Droplet from '../../components/droplet/droplet'
import PageTitle from '../../components/PageTitle/PageTitle'
import './FortnightNoon.css'
import { ErrorBoundary } from 'react-error-boundary'
import { Link } from 'react-router'
import Loading from '../../components/Loading/Loading'
import Error from '../../components/Error/Error'
import HoverInfoCard from '../../components/HoverInfoCard/HoverInfoCard'

export default function FortnightNoon(props) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hoveredData, setHoveredData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=51.4314&longitude=-0.305&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,vapour_pressure_deficit,wind_speed_10m&past_days=7'
        )
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const newData = await response.json()

        const newNewData = newData.hourly
        setData(newNewData)
        setError(null)
      } catch (error) {
        setError('Failed to fetch data.')
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  const handleMouseEnter = (dataPoint) => {
    setHoveredData(dataPoint)
  }

  const handleMouseLeave = () => {
    setHoveredData(null)
  }
  if (loading) {
    return (
      <article className='fortnightNoon'>
        <div className='page-container'>
          <PageTitle>Noon Readings (Two Weeks)</PageTitle>
          <Loading />
        </div>
      </article>
    )
  }

  if (error) {
    return (
      <article className='fortnightNoon'>
        <div className='page-container'>
          <PageTitle>Noon Readings (Two Weeks)</PageTitle>
          <Error error={error} />
        </div>
      </article>
    )
  }

  if (data) {
    var dewReached = false
    const listTimes = data.time
    const listHumidities = data.relative_humidity_2m
    const listTemperatures = data.temperature_2m
    const listDewPoints = data.dew_point_2m

    const today = new Date().toISOString().split('T')[0]

    const noonReadings = listTimes
      .map((time, index) => {
        dewReached = listTemperatures[index] < listDewPoints[index]
        return {
          time,
          humidity: listHumidities[index],
          temperature: listTemperatures[index],
          dewPoint: listDewPoints[index],
          dewReached,
          isNoon: time.includes('T12:00'),
          isToday: time.startsWith(today)
        }
      })
      .filter((item) => item.isNoon)

    const waterElementsTimed = noonReadings.map((pair) => (
      <div
        className='droplet-wrapper'
        key={`${pair.time}`}
        onMouseEnter={() => handleMouseEnter(pair)}
        onMouseLeave={handleMouseLeave}
      >
        <Link to={`/detail/${pair.time}`} className='droplet-link'>
          <Droplet
            humidity={`${pair.humidity}`}
            theTime={`${
              pair.time.includes('T12:00') ? pair.time.slice(8, 10) : ''
            }`}
            svg={false}
            color={pair.dewReached ? 'red' : 'rgb(110, 192, 240)'}
            isToday={pair.isToday}
          />
          <div className='date-label'>
            {new Date(pair.time).toLocaleDateString('en-GB', {
              month: 'short',
              day: 'numeric'
            })}
          </div>
        </Link>
      </div>
    ))

    const todayIndex = noonReadings.findIndex((reading) => reading.isToday)

    return (
      <article className='fortnightNoon'>
        <div className='page-container'>
          <PageTitle>Noon Readings (Two Weeks)</PageTitle>

          <div className='info-box'>
            <h3>Daily Noon Humidity Readings</h3>
            <p>
              This visualization shows humidity levels at noon for each day over
              a two-week period.
            </p>
            <p>
              The day number is displayed inside each droplet for easy
              reference.
            </p>
          </div>

          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <div className='fortnight-legend'>
              <div className='legend-item'>
                <div
                  className='legend-color'
                  style={{ backgroundColor: 'rgb(110, 192, 240)' }}
                ></div>
                <span>Normal Conditions</span>
              </div>
              <div className='legend-item'>
                <div
                  className='legend-color'
                  style={{ backgroundColor: 'red' }}
                ></div>
                <span>Condensation Risk</span>
              </div>
            </div>

            <div className='timeline-indicator'>
              <div className='timeline-section past'>Past Week</div>
              <div className='timeline-divider'></div>
              <div className='timeline-section future'>Coming Week</div>
            </div>

            <section className='fortnightNoon-visualization'>
              {waterElementsTimed}
            </section>
          </ErrorBoundary>
          {hoveredData && <HoverInfoCard hoveredData={hoveredData} />}

          <div className='navigation-links'>
            <Link to='/today' className='nav-link'>
              View Today's Data
            </Link>
            <Link to='/fortnight' className='nav-link'>
              View All Hours
            </Link>
          </div>
        </div>
      </article>
    )
  } else {
    return null
  }
}
