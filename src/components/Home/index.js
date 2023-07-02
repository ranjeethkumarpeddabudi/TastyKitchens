import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import CarouselSection from '../CarouselSection'
import Restaurants from '../Restaurants'
import Footer from '../Footer'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Header activeTab="HOME" />
      <CarouselSection />
      <Restaurants />
      <Footer />
    </>
  )
}

export default Home
