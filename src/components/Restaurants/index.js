import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineLeft, AiOutlineRight, AiOutlineSearch} from 'react-icons/ai'
import RestaurantsFilterSection from '../RestaurantsFilterSection'
import RestaurantItem from '../RestaurantItem'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Restaurants extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    restaurantsList: [],
    searchText: '',
    activePage: 1,
    activeOption: sortByOptions[1].value,
  }

  componentDidMount() {
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activePage, activeOption, searchText} = this.state
    const limit = 9
    const offset = (activePage - 1) * limit

    const url = `https://apis.ccbp.in/restaurants-list?search=${searchText}&offset=${offset}&limit=${limit}&sort_by_rating=${activeOption}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const getUserRatings = userRatings => {
      const formattedRatings = [userRatings].map(each => ({
        ratingText: each.rating_text,
        rating: each.rating,
        ratingColor: each.rating_color,
        totalReviews: each.total_reviews,
      }))
      return formattedRatings
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      const formattedData = fetchedData.restaurants.map(each => ({
        costOfTwo: each.cost_for_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnlineDelivery: each.has_online_delivery,
        hasTableBooking: each.has_table_booking,
        id: each.id,
        imageUrl: each.image_url,
        isDeliveringNow: each.is_delivering_now,
        location: each.location,
        menuType: each.menu_type,
        name: each.name,
        opensAt: each.opens_at,
        userRating: getUserRatings(each.user_rating),
      }))
      this.setState({
        restaurantsList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <>
      <div className="loader-container">
        <Loader type="TailSpin" color="#F7931E" height="54" width="54" />
      </div>
    </>
  )

  decreaseButton = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  onTypeSearch = event => {
    this.setState({searchText: event.target.value}, this.getRestaurantsList)
  }

  increaseButton = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  onChangeOption = selectedOption => {
    this.setState({activeOption: selectedOption}, this.getRestaurantsList)
  }

  renderSuccessView = () => {
    const {restaurantsList, activePage} = this.state

    return (
      <>
        <ul className="restaurant-list-container">
          {restaurantsList.map(each => (
            <RestaurantItem key={each.id} restaurant={each} />
          ))}
        </ul>

        <div className="pagination-container">
          <button
            type="button"
            className="arrow-button"
            onClick={this.decreaseButton}
          >
            <AiOutlineLeft />
          </button>
          <p className="page-number">
            <span>{activePage}</span> of 4
          </p>
          <button
            type="button"
            className="arrow-button"
            onClick={this.increaseButton}
          >
            <AiOutlineRight />
          </button>
        </div>
      </>
    )
  }

  renderFailureView = () => {
    const {searchText} = this.state
    return (
      <div className="no-restaurants-view">
        <img
          src="https://static.vecteezy.com/system/resources/previews/000/275/155/original/awesome-online-food-order-vectors.jpg"
          className="no-restaurants-img"
          alt="no products"
        />
        <h1 className="no-products-heading">
          We Couldn&apos;t find any results for &quot;{searchText}&quot;
        </h1>
        <p className="no-products-description">Please try something else.</p>
      </div>
    )
  }

  renderStatus = () => {
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
    const {activeOption, searchText} = this.state

    return (
      <>
        <RestaurantsFilterSection
          activeOptionValue={activeOption}
          onChangeOption={this.onChangeOption}
          sortOptions={sortByOptions}
        />
        <div className="input-search-container">
          <input
            type="search"
            className="input-search"
            onChange={this.onTypeSearch}
            value={searchText}
          />
          <div>
            <AiOutlineSearch size={30} />
          </div>
        </div>
        <div className="restaurants-container">{this.renderStatus()}</div>
      </>
    )
  }
}

export default Restaurants

// testid = 'pagination-right-button'
// testid = 'active-page-number'
// testid = 'pagination-left-button'
// testid="restaurants-list-loader"
