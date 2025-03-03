import './HoverInfoCard.css'

const HoverInfoCard = ({ hoveredData }) => {
  return (
    <div className='hover-info-card'>
      <h4>
        {new Date(hoveredData.time).toLocaleDateString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </h4>
      <div className='hover-stats'>
        <div className='hover-stat'>
          <span>Humidity:</span>
          <span>{hoveredData.humidity}%</span>
        </div>
        <div className='hover-stat'>
          <span>Temperature:</span>
          <span>{hoveredData.temperature}°C</span>
        </div>
        <div className='hover-stat'>
          <span>Dew Point:</span>
          <span>{hoveredData.dewPoint}°C</span>
        </div>
        <div className='hover-stat'>
          <span>Condensation Risk:</span>
          <span className={hoveredData.dewReached ? 'risk-high' : 'risk-low'}>
            {hoveredData.dewReached ? 'High' : 'Low'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default HoverInfoCard
