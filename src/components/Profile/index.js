import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Profile = () => {
  const userName = Cookies.get('user_name_profile')
  const key = localStorage.getItem('userName')
  console.log(userName, key)
  return (
    <>
      <Header />
      <div className="profile-container">
        <p>{userName}</p>
      </div>
      <Footer />
    </>
  )
}

export default Profile
