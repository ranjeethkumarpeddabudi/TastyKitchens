import {BiPlus, BiMinus, BiRupee} from 'react-icons/bi'
import ReactContext from '../ReactContext'
import './index.css'

const CartItem = props => (
  <ReactContext.Consumer>
    {value => {
      const {onDecreaseQuantity, onIncreaseQuantity} = value
      const {cartFoodItem} = props
      const {name, id, cost, imageUrl, quantity} = cartFoodItem
      const onClickIncrease = () => {
        onIncreaseQuantity(id)
      }
      const onClickDecrease = () => {
        onDecreaseQuantity(id)
      }
      const totalPrice = cost * quantity
      return (
        <li className="food-item-container">
          <img src={imageUrl} className="food-image" alt={name} />
          <div className="items-alignment">
            <h1 className="food-name">{name}</h1>
            <div className="quantity-container">
              <button
                type="button"
                onClick={onClickDecrease}
                className="update-button"
              >
                <BiMinus size={8} />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                onClick={onClickIncrease}
                className="update-button"
              >
                <BiPlus size={8} />
              </button>
            </div>
            <div className="price-container">
              <BiRupee />
              <p>{totalPrice}.00</p>
            </div>
          </div>
        </li>
      )
    }}
  </ReactContext.Consumer>
)
export default CartItem

// testid="cartItem"
//  testid="increment-quantity"
//   testid="decrement-quantity"
//   testid="item-quantity"
