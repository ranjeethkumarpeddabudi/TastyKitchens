import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantItem = props => {
  const {restaurant} = props
  const {imageUrl, cuisine, name, userRating, id} = restaurant
  const [ratingObject] = userRating
  const {rating, totalReviews, ratingColor} = ratingObject

  return (
    <Link to={`/restaurant/${id}`} className="restaurant-nav-link">
      <li className="list-item">
        <img src={imageUrl} alt="restaurant" className="restaurant-logo" />
        <div className="restaurant-details">
          <h1 className="restaurant-name-specific">{name}</h1>
          <p className="cuisine">{cuisine}</p>
          <div className="ratings-container">
            <AiFillStar size={12} color={ratingColor} />
            <p className="rating">{rating}</p>
            <h1 className="review">({totalReviews} ratings)</h1>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default RestaurantItem

// testid="restaurant-item"
