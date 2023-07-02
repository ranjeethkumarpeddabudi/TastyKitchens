import {AiFillStar} from 'react-icons/ai'
import {BiRupee, BiPlus, BiMinus} from 'react-icons/bi'
import ReactContext from '../ReactContext'

import './index.css'

const FoodItem = props => (
  <ReactContext.Consumer>
    {value => {
      const {
        onAddItem,
        cartListItems,
        onDecreaseQuantity,
        onIncreaseQuantity,
      } = value

      const {restaurant} = props
      const {cost, id, imageUrl, rating, name} = restaurant
      const unique = cartListItems.filter(each => each.id === id)
      const quant = unique[0]
      const onAddButton = () => {
        onAddItem(restaurant)
      }
      const onClickIncrease = () => {
        onIncreaseQuantity(id)
      }
      const onClickDecrease = () => {
        onDecreaseQuantity(id)
      }
      const isAdded = cartListItems.find(each => each.id === id)

      return (
        <li className="food-item-list">
          <img src={imageUrl} alt={imageUrl} className="food-image" />
          <div className="food-item-info">
            <h1 className="food-name">{name}</h1>
            <div className="food-cost">
              <BiRupee />
              <p>{cost}</p>
            </div>
            <div className="food-rating-container">
              <AiFillStar size={12} color="#FFCC00" />
              <p className="food-rating">{rating}</p>
            </div>
            {isAdded ? (
              <div className="quantity-container">
                <button
                  type="button"
                  onClick={onClickDecrease}
                  className="update-button"
                >
                  <BiMinus size={8} />
                </button>
                <p className="quantity">{quant.quantity}</p>
                <button
                  type="button"
                  onClick={onClickIncrease}
                  className="update-button"
                >
                  <BiPlus size={8} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="add-button"
                onClick={onAddButton}
              >
                Add
              </button>
            )}
          </div>
        </li>
      )
    }}
  </ReactContext.Consumer>
)

export default FoodItem

// testid="foodItem"
//  testid="increment-count"
//  testid="active-count"
//   testid="decrement-count"
