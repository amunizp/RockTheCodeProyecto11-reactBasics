import { useEffect, useState } from 'react'
import Droplet from '../../components/droplet/droplet'
import PageTitle from '../../components/PageTitle/PageTitle'
import './FortnightNoon.css'
import { ErrorBoundary } from 'react-error-boundary'
import { Link } from 'react-router'

export default function FortnightNoon(props) {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=51.4314&longitude=-0.305&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,vapour_pressure_deficit,wind_speed_10m&past_days=7'
      )
      const newData = await response.json()

      const newNewData = newData.hourly
      setData(newNewData)
    }

    fetchData()
  }, [])

  if (data) {
    const listTimes = data.time
    const listHumidities = data.relative_humidity_2m
    const listHumiditiesTimes = listTimes.map((time, index) => {
      return { time, humidity: listHumidities[index] }
    })

    const waterElementsTimed = listHumiditiesTimes.map((pair) => (
      <Link to={`/detail/${pair.time}`} key={`${pair.time}`}>
        <Droplet
          humidity={`${pair.humidity}`}
          theTime={`${
            pair.time.includes('T12:00') ? pair.time.slice(8, 10) : ''
          }`}
          svg={false}
        />
      </Link>
    ))
    return (
      <article className='fortnightNoon'>
        <PageTitle>FortnightNoon</PageTitle>
        <p>{`${data ? '' : 'Loading...'}`}</p>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <section className='fortnightNoon'>{waterElementsTimed}</section>
        </ErrorBoundary>
      </article>
    )
  } else {
    return null
  }
}
