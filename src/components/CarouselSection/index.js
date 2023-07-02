import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import './index.css'

class CarouselSection extends Component {
  state = {
    showBanner: false,
    imagesList: [],
  }

  componentDidMount() {
    this.getBannerImages()
  }

  getBannerImages = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      options,
    )
    const jsonData = await response.json()
    if (response.ok === true) {
      const formattedData = jsonData.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      this.setState({imagesList: formattedData, showBanner: true})
    }
  }

  render() {
    const {showBanner, imagesList} = this.state
    const settings = {
      dots: true,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <div className="banner-section">
        {showBanner ? (
          <div className="banner-container">
            <Slider {...settings}>
              {imagesList.map(each => (
                <div key={each.id}>
                  <img
                    src={each.imageUrl}
                    alt="offer"
                    className="banner-image"
                  />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="loader-container">
            <Loader type="TailSpin" color="#F7931E" height="54" width="54" />
          </div>
        )}
      </div>
    )
  }
}
export default CarouselSection

// testid="restaurants-offers-loader"
