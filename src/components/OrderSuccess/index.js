import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const OrderSuccess = () => (
  <>
    <Header />
    <div className="success-main-container">
      <div className="success-container">
        <img
          src="https://res.cloudinary.com/dyumtyemc/image/upload/v1687766425/check-circle.1_1_unplph.png"
          alt="success"
          className="success-image"
        />
        <h1 className="payment-heading">Payment Successful</h1>
        <p className="greeting">
          Thank you for ordering Your payment is successfully completed.
        </p>
        <Link to="/" className="homepage-nav-link">
          <button type="button" className="homepage-button">
            Go To Home Page
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default OrderSuccess
