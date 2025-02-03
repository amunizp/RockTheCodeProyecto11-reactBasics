import './Header.css'

const Header = ({ titleName }) => {
  return (
    <div className='header'>
      <h1>{titleName}</h1>
    </div>
  )
}

export default Header
