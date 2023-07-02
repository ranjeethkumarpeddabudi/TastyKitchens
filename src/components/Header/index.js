import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineMenu, AiFillCloseCircle} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import ReactContext from '../ReactContext'
import './index.css'

const Header = props => (
  <ReactContext.Consumer>
    {value => {
      const {showMenu, onClickMenu} = value
      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }
      const onClickShow = () => {
        onClickMenu()
      }
      const {activeTab} = props
      const activeHome = activeTab === 'HOME' ? 'active' : null
      const activeCart = activeTab === 'CART' ? 'active' : null

      return (
        <>
          <nav className="nav-desktop-container">
            <Link to="/" className="nav-link">
              <img
                src="https://res.cloudinary.com/dyumtyemc/image/upload/v1687462292/Group_7420_ke98th.png"
                alt="website logo"
                className="home-website-logo"
              />
            </Link>
            <h1 className="website-name">Tasty Kitchens</h1>
            <ul className="nav-group-container">
              <Link to="/" className={`nav-group-link ${activeHome}`}>
                <li>Home</li>
              </Link>
              <Link to="/cart" className={`nav-group-link ${activeCart}`}>
                <li>Cart</li>
              </Link>
              <li>
                <button
                  type="button"
                  className="logout-button"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </li>

              <li>
                <button type="button" className="profile-button">
                  <CgProfile size={30} />
                </button>
              </li>
            </ul>
          </nav>
          <nav className="nav-mobile-container">
            <Link to="/" className="nav-link">
              <img
                src="https://res.cloudinary.com/dyumtyemc/image/upload/v1687462292/Group_7420_ke98th.png"
                alt="website logo"
                className="home-website-logo"
              />
            </Link>
            <p className="website-name">Tasty Kitchens</p>
            <button type="button" className="hamburger" onClick={onClickShow}>
              <AiOutlineMenu />
            </button>
          </nav>
          {showMenu && (
            <div className="menu-view">
              <ul className="nav-group-container">
                <Link to="/" className={`nav-group-link ${activeHome}`}>
                  <li>Home</li>
                </Link>
                <Link to="/cart" className={`nav-group-link ${activeCart}`}>
                  <li>Cart</li>
                </Link>
                <li>
                  <button
                    type="button"
                    className="logout-button"
                    onClick={onClickLogout}
                  >
                    Logout
                  </button>
                </li>

                <li>
                  <button type="button" className="profile-button">
                    <CgProfile size={30} />
                  </button>
                </li>
              </ul>
              <button type="button" className="hamburger" onClick={onClickShow}>
                <AiFillCloseCircle />
              </button>
            </div>
          )}
        </>
      )
    }}
  </ReactContext.Consumer>
)
export default withRouter(Header)
