import { useEffect, useState } from 'react'
import Droplet from '../../components/droplet/droplet'
import PageTitle from '../../components/PageTitle/PageTitle'
import './Fortnight.css'
import { ErrorBoundary } from 'react-error-boundary'
import { Link } from 'react-router'
import Loading from '../../components/Loading/Loading'
import Error from '../../components/Error/Error'
import HoverInfoCard from '../../components/HoverInfoCard/HoverInfoCard'

export default function Fortnight(props) {
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

        setData(newData.hourly)
        setError(null)
      } catch (error) {
        setError("Couldn't fetch data")
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
      <article className='fortnight'>
        <div className='page-container'>
          <PageTitle>Two-Week Humidity Data</PageTitle>
          <Loading />
        </div>
      </article>
    )
  }
  if (error) {
    return (
      <article className='fortnight'>
        <div className='page-container'>
          <PageTitle>Two-Week Humidity Data</PageTitle>
          <Error error={error} />
        </div>
      </article>
    )
  }

  if (data) {
    const listTimes = data.time
    const listHumidities = data.relative_humidity_2m
    const listTemperatures = data.temperature_2m
    const listDewPoints = data.dew_point_2m

    const listHumiditiesTimes = listTimes.map((time, index) => {
      const dewReached = listTemperatures[index] < listDewPoints[index]
      return {
        time,
        humidity: listHumidities[index],
        temperature: listTemperatures[index],
        dewPoint: listDewPoints[index],
        dewReached
      }
    })

    // // Filter to show fewer data points (e.g., every 6 hours)
    // const filteredData = listHumiditiesTimes.filter(
    //   (_, index) => index % 6 === 0
    // )
    const maxHumidity = Math.max(
      ...listHumiditiesTimes.map((item) => item.humidity)
    )

    const humidityBars = listHumiditiesTimes.map((pair, index) => (
      <div
        className='droplet-wrapper'
        key={`${pair.time}`}
        onMouseEnter={() => handleMouseEnter(pair)}
        onMouseLeave={handleMouseLeave}
        style={{
          height: `${pair.humidity}%`,

          margin: '0px',
          backgroundColor: pair.dewReached ? 'red' : 'rgb(110, 192, 240)'
        }}
      >
        <Link to={`/detail/${pair.time}`} className='bar-link'>
          <span className='sr-only'>{`Humidity: ${
            pair.humidity
          }%, Time: ${new Date(pair.time).toLocaleString()}`}</span>
        </Link>
      </div>
    ))

    return (
      <article className='fortnight'>
        <div className='page-container'>
          <PageTitle>Two-Week Humidity Data</PageTitle>

          <div className='info-box'>
            <h3>Humidity Trends Over Two Weeks</h3>
            <p>
              This visualization shows humidity levels over the past week and
              forecast for the coming week.
            </p>
            <p>
              Red droplets indicate times when condensation is likely
              (temperature below dew point).
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

            <div className='fortnight-chart'>
              <div className='y-axis'>
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>

              <div className='fortnight-visualization'>{humidityBars}</div>
            </div>
            <div className='x-axis'>
              <span>{new Date(listTimes[0]).toLocaleDateString()}</span>
              <span>
                {new Date(
                  listTimes[Math.floor(listTimes.length / 2)]
                ).toLocaleDateString()}
              </span>
              <span>
                {new Date(listTimes[listTimes.length - 1]).toLocaleDateString()}
              </span>
            </div>
          </ErrorBoundary>
          {hoveredData && <HoverInfoCard hoveredData={hoveredData} />}
          <div className='navigation-links'>
            <Link to='/today' className='nav-link'>
              View Today's Data
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
