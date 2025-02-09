import { Link } from 'react-router'
import Droplet from '../droplet/droplet'
import './droplets.css'

const Droplets = () => {
  return (
    <section className='droplets'>
      <Link to='/'>
        <Droplet titleName='Home' />
      </Link>
      <Link to='/about'>
        <Droplet titleName='About' />
      </Link>
      <Link to='/today'>
        <Droplet titleName='Today' />
      </Link>
      <Link to='/fortnight'>
        <Droplet titleName='Fortnight' />
      </Link>
    </section>
  )
}

export default Droplets
