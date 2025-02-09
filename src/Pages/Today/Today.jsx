import { useEffect, useState } from 'react'
import Droplet from '../../components/droplet/droplet'
import PageTitle from '../../components/PageTitle/PageTitle'
import './Today.css'
import { ErrorBoundary } from 'react-error-boundary'
import { Link } from 'react-router'

export default function Today(props) {
  const [data, setData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=51.4314&longitude=-0.305&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,vapour_pressure_deficit,wind_speed_10m&past_days=7'
      )
      const newData = await response.json()
      setData(newData)
    }

    fetchData()
  }, [])

  if (data) {
    return (
      <article className='today'>
        <PageTitle>Today</PageTitle>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <section className='today'>
            <Link to={`/detail/${data.hourly.time[204]}`}>
              <Droplet
                titleName='Midday'
                theTime={`${data.hourly.time[204]}`}
                humidity={`${data.hourly.relative_humidity_2m[204]}`}
              />
            </Link>
          </section>
        </ErrorBoundary>
      </article>
    )
  } else {
    return null
  }
}
