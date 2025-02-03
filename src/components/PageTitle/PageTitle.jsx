import './PageTitle.css'

const PageTitle = (prop) => {
  return (
    <div className='pagetitle'>
      <h2>{prop.children}</h2>
    </div>
  )
}

export default PageTitle
