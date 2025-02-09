import './droplet.css'

const Droplet = ({
  titleName = '',
  humidity = '100',
  theTime = '',
  svg = true
}) => {
  const svgElement = svg ? (
    <svg width='100%' viewBox='0 0 30 42'>
      <path
        fill='blue'
        stroke='#000'
        strokeWidth='1.5'
        d='M15 3
           Q16.5 6.8 25 18
           A12.8 12.8 0 1 1 5 18
           Q13.5 6.8 15 3z'
      />
    </svg>
  ) : (
    <svg width='100%' viewBox='0 0 30 42'>
      <path fill='blue' />
    </svg>
  )
  return (
    <div className='droplet'>
      <div className='innerDroplet' style={{ height: 100 - humidity + '%' }}>
        <h4>{titleName}</h4>
        {svgElement}
      </div>
      <p>{theTime}</p>
    </div>
  )
}

export default Droplet
