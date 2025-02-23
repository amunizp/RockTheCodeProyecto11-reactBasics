import Droplets from '../../components/droplets/droplets'
import PageTitle from '../../components/PageTitle/PageTitle'
import './About.css'
const About = () => {
  return (
    <article className='about'>
      <PageTitle>About</PageTitle>
      <p>☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️</p>
      <p>Trying to keep dry</p>
      <p>☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️</p>
      <p>
        This app will show you the humidity levels for today at noon. If at any
        moment the temperature is bellow dhe dew point the plot will show red
        rather than the usual light blue.{' '}
      </p>
      <p>
        Fortnight shows the humidity values from last week and the prediction
        for next week. You can click on any section of the plot and it will give
        you some extra information for that time.{' '}
      </p>
      <p>
        Fortnight Noon will give you the same information but will indicate the
        day of the measurement.{' '}
      </p>
    </article>
  )
}

export default About
