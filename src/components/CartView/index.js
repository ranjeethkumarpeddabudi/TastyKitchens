import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
import ReactContext from '../ReactContext'
import CartItem from '../CartItem'
import './index.css'

const CartView = () => (
  <ReactContext.Consumer>
    {value => {
      // eslint-disable-next-line
      const {cartListItems} = value
      const stringifiedCartList = localStorage.getItem('cartData')
      const parsedCartList = JSON.parse(stringifiedCartList)
      let totalPrice = 0
      parsedCartList.forEach(each => {
        totalPrice += each.quantity * each.cost
      })

      return (
        <>
          <Header activeTab="CART" />

          {parsedCartList.length >= 1 ? (
            <>
              <div className="items-container">
                <div className="cart-items-container">
                  <div className="headings-container">
                    <p>Item</p>
                    <p>Quantity</p>
                    <p>Price</p>
                  </div>
                  <ul className="cart-items-list">
                    {parsedCartList.map(each => (
                      <CartItem key={each.id} cartFoodItem={each} />
                    ))}
                  </ul>
                  <hr className="dotted-line" />
                  <div className="total-container">
                    <h1 className="order-total">Order Total:</h1>
                    <div className="total-price-container">
                      <BiRupee />
                      <p>{totalPrice}.00</p>
                    </div>
                  </div>
                  <Link to="/order-success" className="order-nav">
                    <button type="button" className="place-order">
                      Place Order
                    </button>
                  </Link>
                </div>
              </div>

              <Footer />
            </>
          ) : (
            <div className="success-main-container">
              <div className="success-container">
                <img
                  src="https://res.cloudinary.com/dyumtyemc/image/upload/v1687781665/Layer_2_q8ynx1.png"
                  alt="empty cart"
                  className="no-orders-image"
                />
                <h1 className="no-orders-yet">No Order Yet!</h1>
                <p className="greeting">
                  Your cart is empty. Add something from the menu.
                </p>
                <Link to="/" className="homepage-nav-link">
                  <button type="button" className="homepage-button">
                    Order Now
                  </button>
                </Link>
              </div>
            </div>
          )}
        </>
      )
    }}
  </ReactContext.Consumer>
)
export default CartView

// testid = 'total-price'
