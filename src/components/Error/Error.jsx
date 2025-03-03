import './Error.css'

const Error = ({ error }) => {
  return (
    <div className='error-message'>
      <p>{error}</p>
      <button onClick={() => window.location.reload()} className='retry-button'>
        Retry
      </button>
    </div>
  )
}

export default Error
