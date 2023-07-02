import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dyumtyemc/image/upload/v1687542619/erroring_1_jp2knr.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-info">
      We are sorry, the page you requested could not be found.
      <br />
      Please go back to the homepage
    </p>
    <Link to="/">
      <button type="button" className="redirect-button">
        Home Page
      </button>
    </Link>
  </div>
)
export default NotFound
