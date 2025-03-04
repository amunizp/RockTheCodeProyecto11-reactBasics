import { useEffect, useState } from 'react'
import Droplet from '../../components/droplet/droplet'
import PageTitle from '../../components/PageTitle/PageTitle'
import './Today.css'
import { ErrorBoundary } from 'react-error-boundary'
import { Link } from 'react-router'
import Error from '../../components/Error/Error'
import Loading from '../../components/Loading/Loading'

export default function Today(props) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Simulate a delay of 2 seconds
        // await new Promise((resolve) => setTimeout(resolve, 2000))

        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=51.4314&longitude=-0.305&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,vapour_pressure_deficit,wind_speed_10m&past_days=7'
        )
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const newData = await response.json()
        setData(newData)
        setError(null)
      } catch (error) {
        setError('Faild to load the weather data. Please try again later.')
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <article className='today'>
        <div className='page-container'>
          <PageTitle>Today At Noon</PageTitle>
          <Loading />
        </div>
      </article>
    )
  }

  if (error) {
    return (
      <article className='today'>
        <div className='page-container'>
          <PageTitle>Today At Noon</PageTitle>
          <Error error={error} />
        </div>
      </article>
    )
  }
  if (data) {
    const currentIndex = 204
    const currentTime = data.hourly.time[currentIndex]
    const currentHumidity = data.hourly.relative_humidity_2m[currentIndex]
    const currentTemp = data.hourly.temperature_2m[currentIndex]
    const currentDewPoint = data.hourly.dew_point_2m[currentIndex]
    const condensationRisk = currentTemp <= currentDewPoint

    return (
      <article className='today'>
        <div className='page-container'>
          <PageTitle>Today At Noon</PageTitle>

          <div className='info-box'>
            <h3>Current Humidity Status</h3>
            <p>
              This visualization shows today's humidity level at noon for
              Parkleys Estate.
            </p>
            <p>
              The water level in the beaker represents the relative humidity
              percentage.
            </p>
          </div>

          <ErrorBoundary
            fallback={
              <div className='error-message'>
                Something went wrong displaying the humidity data
              </div>
            }
          >
            <div className='humidity-display'>
              <div className='humidity-info'>
                <div className='humidity-stats'>
                  <div className='stat-item'>
                    <span className='stat-label'>Date:</span>
                    <span className='stat-value'>
                      {currentTime.slice(0, 10)}
                    </span>
                  </div>
                  <div className='stat-item'>
                    <span className='stat-label'>Humidity:</span>
                    <span className='stat-value'>{currentHumidity}%</span>
                  </div>
                  <div className='stat-item'>
                    <span className='stat-label'>Temperature:</span>
                    <span className='stat-value'>{currentTemp}°C</span>
                  </div>
                  <div className='stat-item'>
                    <span className='stat-label'>Dew Point:</span>
                    <span className='stat-value'>{currentDewPoint}°C</span>
                  </div>
                  <div className='stat-item'>
                    <span className='stat-label'>Condensation Risk:</span>
                    <span
                      className={`stat-value ${
                        condensationRisk ? 'risk-high' : 'risk-low'
                      }`}
                    >
                      {condensationRisk ? 'High' : 'Low'}
                    </span>
                  </div>
                </div>

                <div className='humidity-explanation'>
                  {condensationRisk ? (
                    <p className='risk-warning'>
                      <strong>Warning:</strong> The current temperature is below
                      the dew point, which means condensation is likely forming
                      on cold surfaces.
                    </p>
                  ) : (
                    <p>
                      The current temperature is above the dew point, so
                      condensation is unlikely to form on surfaces.
                    </p>
                  )}
                </div>
              </div>

              <section className='today-visualization'>
                <aside className='chart-scale'>
                  <p>Humidity 100% ➡️</p>
                  <p>Humidity 0% ➡️</p>
                </aside>
                <Link
                  to={`/detail/${currentTime}`}
                  className='droplet-container'
                >
                  <Droplet
                    titleName=''
                    theTime={`${currentTime.slice(0, 10)}`}
                    humidity={`${currentHumidity}`}
                    svg={true}
                    color={condensationRisk ? 'red' : 'rgb(110, 192, 240)'}
                  />
                </Link>
              </section>
            </div>
          </ErrorBoundary>

          <div className='navigation-links'>
            <Link to='/fortnight' className='nav-link'>
              View Two-Week Data
            </Link>
            <Link to='/fortnightnoon' className='nav-link'>
              View Noon Readings
            </Link>
          </div>
        </div>
      </article>
    )
  } else {
    return null
  }
}
