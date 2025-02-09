import { useEffect, useState } from 'react'
import Droplet from '../../components/droplet/droplet'
import PageTitle from '../../components/PageTitle/PageTitle'
import './Detail.css'
import { ErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router'

export default function Detail(props) {
  const [data, setData] = useState(null)
  const { thedatetime } = useParams()
  console.log(thedatetime)
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
  const isDateTime = (element) => element === thedatetime
  if (data) {
    console.log('the list of times', data.hourly.time)
    let theDetailIndex = data.hourly.time.findIndex(isDateTime)
    console.log('the index', theDetailIndex)
    if (theDetailIndex == -1) {
      return <article>I did not find that date time</article>
    } else {
      return (
        <article className='detail'>
          <PageTitle>Detail</PageTitle>
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <section className='detail'>
              <p>The Date time: {`${data.hourly.time[theDetailIndex]}`} </p>
              <p>
                The Humidity:{' '}
                {`${data.hourly.relative_humidity_2m[theDetailIndex]}${data.hourly_units.relative_humidity_2m}`}
              </p>
              <p>
                The Temperature:{' '}
                {`${data.hourly.temperature_2m[theDetailIndex]}${data.hourly_units.temperature_2m}`}
              </p>
              <p>
                The Dew Point:{' '}
                {`${data.hourly.dew_point_2m[theDetailIndex]}${data.hourly_units.dew_point_2m}`}
              </p>
              <p>{`${
                data.hourly.dew_point_2m[theDetailIndex] >
                data.hourly.temperature_2m[theDetailIndex]
                  ? '<i>Probably Condensation</i>'
                  : 'Probably no Condensation'
              }`}</p>
              <p>
                The Pressure:{' '}
                {`${data.hourly.vapour_pressure_deficit[theDetailIndex]}${data.hourly_units.vapour_pressure_deficit}`}
              </p>
              <p>
                The Wind Speed:{' '}
                {`${data.hourly.wind_speed_10m[theDetailIndex]}${data.hourly_units.wind_speed_10m}`}
              </p>
            </section>
          </ErrorBoundary>
        </article>
      )
    }
  } else {
    return null
  }
}
