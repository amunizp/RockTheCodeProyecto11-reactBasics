import { useEffect, useState } from 'react'
import Droplet from '../../components/droplet/droplet'
import PageTitle from '../../components/PageTitle/PageTitle'
import './Detail.css'
import { ErrorBoundary } from 'react-error-boundary'
import { Link, useParams } from 'react-router'
import Loading from '../../components/Loading/Loading'

export default function Detail(props) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { thedatetime } = useParams()

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
        setData(newData)
        setError(null)
      } catch (error) {
        setError('Failed to load weather data. Please try again later.')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  if (loading) {
    return (
      <article className='detail'>
        <div className='page-container'>
          <PageTitle>Weather Details</PageTitle>
          <Loading />
        </div>
      </article>
    )
  }
  if (error) {
    return (
      <article className='detail'>
        <div className='page-container'>
          <PageTitle>Weather Details</PageTitle>
          <Error error={error} />
        </div>
      </article>
    )
  }
  const isDateTime = (element) => element === thedatetime

  if (data) {
    const theDetailIndex = data.hourly.time.findIndex(isDateTime)

    if (theDetailIndex == -1) {
      ;<article className='detail'>
        <div className='page-container'>
          <PageTitle>Weather Details</PageTitle>
          <div className='error-message'>
            <p>We couldn't find data for the requested date and time.</p>
            <Link to='/fortnight' className='nav-link'>
              Return to Fortnight View
            </Link>
          </div>
        </div>
      </article>
    } else {
      const dateTime = data.hourly.time[theDetailIndex]
      const humidity = data.hourly.relative_humidity_2m[theDetailIndex]
      const temperature = data.hourly.temperature_2m[theDetailIndex]
      const dewPoint = data.hourly.dew_point_2m[theDetailIndex]
      const pressure = data.hourly.vapour_pressure_deficit[theDetailIndex]
      const windSpeed = data.hourly.wind_speed_10m[theDetailIndex]
      const condensationRisk = temperature < dewPoint

      const formattedDate = new Date(dateTime).toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })

      return (
        <article className='detail'>
          <div className='page-container'>
            <PageTitle>Weather Details</PageTitle>

            <div className='detail-header'>
              <h3>{formattedDate}</h3>
              <div className='location-info'>Parkleys Estate, London</div>
            </div>
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <section className='detail-content'>
                <div className='detail-visualization'>
                  <Droplet
                    humidity={`${humidity}`}
                    svg={true}
                    color={condensationRisk ? 'red' : 'rgb(110, 192, 240)'}
                  />
                </div>

                <section className='detail-data'>
                  <div className='data-card'>
                    <h4>Humidity Conditions</h4>

                    <div className='data-grid'>
                      <div className='data-item'>
                        <div className='data-label'>Relative Humidity</div>
                        <div className='data-value'>
                          {humidity}
                          {data.hourly_units.relative_humidity_2m}
                        </div>
                      </div>

                      <div className='data-item'>
                        <div className='data-label'>Temperature</div>
                        <div className='data-value'>
                          {temperature}
                          {data.hourly_units.temperature_2m}
                        </div>
                      </div>

                      <div className='data-item'>
                        <div className='data-label'>Dew Point</div>
                        <div className='data-value'>
                          {dewPoint}
                          {data.hourly_units.dew_point_2m}
                        </div>
                      </div>

                      <div className='data-item'>
                        <div className='data-label'>
                          Vapour Pressure Deficit
                        </div>
                        <div className='data-value'>
                          {pressure}
                          {data.hourly_units.vapour_pressure_deficit}
                        </div>
                      </div>

                      <div className='data-item'>
                        <div className='data-label'>Wind Speed</div>
                        <div className='data-value'>
                          {windSpeed}
                          {data.hourly_units.wind_speed_10m}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='condensation-status'>
                    <h4>Condensation Assessment</h4>
                    <div
                      className={`status-indicator ${
                        condensationRisk ? 'risk' : 'safe'
                      }`}
                    >
                      {condensationRisk
                        ? 'Condensation Risk'
                        : 'No Condensation Risk'}
                    </div>
                    <p className='status-explanation'>
                      {condensationRisk
                        ? 'The temperature is below the dew point, which means water vapor in the air will likely condense on cold surfaces. Consider using dehumidifiers or improving ventilation.'
                        : 'The temperature is above the dew point, so condensation is unlikely to form on surfaces under normal conditions.'}
                    </p>
                  </div>
                </section>
              </section>
            </ErrorBoundary>
            <div className='navigation-links'>
              <Link to='/fortnight' className='nav-link'>
                Back to Fortnight View
              </Link>
              <Link to='/fortnightnoon' className='nav-link'>
                View Noon Readings
              </Link>
            </div>
          </div>
        </article>
      )
    }
  } else {
    return null
  }
}
