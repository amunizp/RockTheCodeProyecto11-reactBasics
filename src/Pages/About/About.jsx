import PageTitle from '../../components/PageTitle/PageTitle'
import './About.css'

const About = () => {
  return (
    <article className='about'>
      <div className='page-container'>
        <PageTitle>About Our Humidity Monitor</PageTitle>

        <div className='info-box'>
          <h3>Parkleys Estate Condensation Monitoring System</h3>
          <p>
            A community-driven tool to help residents track humidity levels and
            prevent condensation issues.
          </p>
        </div>

        <div className='about-section'>
          <h3 className='section-title'>How It Works</h3>
          <p className='section-description'>
            This app monitors humidity levels in our estate and helps identify
            potential condensation risks. When the temperature falls below the
            dew point, condensation is likely to occur on surfaces.
          </p>

          <div className='feature-explanation'>
            <div className='feature-card'>
              <h4>Today at Noon</h4>
              <p>
                Shows the current day's humidity level at noon. The
                visualization indicates the relative humidity with a
                water-filled beaker.
              </p>
            </div>

            <div className='feature-card'>
              <h4>Fortnight View</h4>
              <p>
                Displays humidity values from the past week and predictions for
                the next week. Click on any section of the plot for detailed
                information.
              </p>
            </div>

            <div className='feature-card'>
              <h4>Fortnight Noon</h4>
              <p>
                Shows the same information as Fortnight but specifically for
                noon each day, with day indicators for easier tracking.
              </p>
            </div>

            <div className='feature-card'>
              <h4>Condensation Warning</h4>
              <p>
                When the temperature falls below the dew point, the
                visualization will show red instead of light blue, indicating
                potential condensation.
              </p>
            </div>
          </div>
        </div>

        <div className='about-section'>
          <h3 className='section-title'>Data Source</h3>
          <p className='section-description'>
            We use the Open-Meteo API to fetch accurate weather data for our
            location. The data is updated regularly to provide the most current
            information.
          </p>
        </div>

        <div className='about-section'>
          <h3 className='section-title'>How to Use This Tool</h3>
          <p className='section-description'>
            Browse through the different views to monitor humidity levels. Click
            on any data point to see detailed information including temperature,
            dew point, and condensation risk assessment.
          </p>
        </div>
      </div>
    </article>
  )
}

export default About
