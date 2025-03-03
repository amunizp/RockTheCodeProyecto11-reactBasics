import './Loading.css'

const Loading = () => {
  return (
    <div className='loading-indicator'>
      <div className='spinner'></div>
      <p className='loader'>Loading humidity data</p>
    </div>
  )
}

export default Loading
