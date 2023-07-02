import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    restaurantDetails: [],
    foodItems: [],
  }

  componentDidMount() {
    this.getRestaurantInfo()
  }

  getRestaurantInfo = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      `https://apis.ccbp.in/restaurants-list/${id}`,
      options,
    )
    const fetchedData = await response.json()

    if (response.ok === true) {
      const formattedRestaurantDetails = {
        costForTwo: fetchedData.cost_for_two,
        cuisine: fetchedData.cuisine,
        id: fetchedData.id,
        imageUrl: fetchedData.image_url,
        itemsCount: fetchedData.items_count,
        location: fetchedData.location,
        name: fetchedData.name,
        opensAt: fetchedData.opens_at,
        rating: fetchedData.rating,
        reviewsCount: fetchedData.reviews_count,
      }
      const formattedFoodItems = fetchedData.food_items.map(each => ({
        cost: each.cost,
        foodType: each.food_type,
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
        rating: each.rating,
      }))
      this.setState({
        restaurantDetails: formattedRestaurantDetails,
        foodItems: formattedFoodItems,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#F7931E" height="54" width="54" />
    </div>
  )

  renderSuccessView = () => {
    const {restaurantDetails, foodItems} = this.state

    const {
      costForTwo,
      cuisine,
      imageUrl,
      location,
      name,
      // eslint-disable-next-line
      opensAt,
      rating,
      reviewsCount,
    } = restaurantDetails

    return (
      <>
        <div className="restaurant-banner-container">
          <div className="specific-restaurant-container">
            <img src={imageUrl} alt="restaurant" className="restaurant-image" />
            <div className="details-container">
              <h1 className="restaurant-name">{name}</h1>
              <p className="restaurant-cuisine">{cuisine}</p>
              <p className="restaurant-location">{location}</p>
              <div className="rating-cost-container">
                <div className="rating-main-container">
                  <div className="rating-container">
                    <AiFillStar size={12} color="#ffffff" />
                    <p className="restaurant-rating">{rating}</p>
                  </div>
                  <p className="restaurant-reviews-count">
                    {reviewsCount}+ Ratings
                  </p>
                </div>
                <div>
                  <div className="cost-container">
                    <BiRupee />
                    <p>{costForTwo}</p>
                  </div>
                  <p className="cost-for-two">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-container">
          {foodItems.map(each => (
            <FoodItem key={each.id} restaurant={each} />
          ))}
        </ul>
      </>
    )
  }

  renderRestaurantDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header activeTab="HOME" />
        {this.renderRestaurantDetails()}
        <Footer />
      </>
    )
  }
}
export default RestaurantDetails

// testid="restaurant-details-loader"
